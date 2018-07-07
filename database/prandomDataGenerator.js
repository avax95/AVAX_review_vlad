const fs = require('fs');
const faker = require('faker');
const path = require('path');

const generateInteger = (max = 1, min = 0) => Math.random() * ((max + 1) - min) + min;
const generateDateString = (maxDate = '2020-12-31', minDate = '1990-1-1') => {
  const startTime = new Date(minDate).getTime();
  const endTime = new Date(maxDate).getTime();
  const randomDate = new Date(generateInteger(endTime, startTime));
  return [randomDate.getFullYear(), randomDate.getMonth() + 1, randomDate.getDate()].join('-');
};

let id,
  text,
  date,
  accuracy,
  communication,
  cleanliness,
  location,
  checkIn,
  value,
  aggregateRate,
  userId,
  roomId,
  roomName,
  totalNumberReviews,
  user,
  room,
  userName,
  avatar;

const reviewLine = () => {
  text = faker.lorem.paragraph();
  date = generateDateString();
  accuracy = faker.random.number({ min: 1, max: 5 });
  communication = faker.random.number({ min: 1, max: 5 });
  cleanliness = faker.random.number({ min: 1, max: 5 });
  location = faker.random.number({ min: 1, max: 5 });
  checkIn = faker.random.number({ min: 1, max: 5 });
  value = faker.random.number({ min: 1, max: 5 });
  aggregateRate = Math.floor((accuracy + communication + cleanliness + location + checkIn + value) / 6);
  userName = faker.name.findName();
  avatar = `https://s3-us-west-1.amazonaws.com/nappbnbreviews/portait${Math.floor(Math.random() * 348)}.jpeg`;
  roomId = faker.random.number({ min: 1100000, max: 3000000 });
  return `${text},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value},${aggregateRate},${userName},${avatar},${roomId}`;
};

const roomLine = () => {
  roomName = faker.commerce.productName();
  totalNumberReviews = faker.random.number({ min: 1, max: 200 });
  accuracy = faker.random.number({ min: 1, max: 5 });
  communication = faker.random.number({ min: 1, max: 5 });
  cleanliness = faker.random.number({ min: 1, max: 5 });
  location = faker.random.number({ min: 1, max: 5 });
  checkIn = faker.random.number({ min: 1, max: 5 });
  value = faker.random.number({ min: 1, max: 5 });
  aggregateRate = Math.floor((accuracy + communication + cleanliness + location + checkIn + value) / 6);
  return `${roomName},${totalNumberReviews},${accuracy},${communication},${cleanliness},${location},${checkIn},${value},${aggregateRate}`;
};

const headers = {
  reviews: 'text,date,accuracy,communication,cleanliness,location,checkIn,value,aggregateRate,userName,avatar,roomId\n',
  rooms: 'id,roomName,totalNumberReviews,accuracy,communication,cleanliness,location,checkIn,value,aggregateRate\n',
};

function writeNTimes(writer, header, times, line, needId = true) {
  let i = 1100000;
  write();
  function write() {
    let ok = true;
    do {
      const finalLine = needId ? `${i},${line()}\n` : `${line()}\n`;
      if (i % 500000 === 0) {
        console.log('chunk', i, finalLine);
      }
      if (i === 1100000) {
        ok = writer.write(header);
      }
      if (i === times) {
        writer.write(finalLine);
        writer.end();
      } else {
        ok = writer.write(finalLine);
      }
      i++;
    } while (i < times && ok);
    if (i < times) {
      writer.once('drain', write);
    }
  }
}
// writeNTimes(fs.createWriteStream('reviews.csv'), headers.reviews, 30000000, reviewLine, false);
writeNTimes(fs.createWriteStream('rooms.csv'), headers.rooms, 3000000, roomLine);
