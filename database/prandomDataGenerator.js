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
  score,
  userId,
  roomId,
  roomName,
  totalNumberReviews,
  user,
  room,
  username,
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
  score = Math.floor((accuracy + communication + cleanliness + location + checkIn + value) / 6);
  user = faker.random.number({ min: 0, max: 1000000 });
  room = faker.random.number({ min: 0, max: 10000000 });
  return `${text},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value},${score},${user},${room}`;
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
  score = Math.floor((accuracy + communication + cleanliness + location + checkIn + value) / 6);
  return `${roomName},${totalNumberReviews},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}`;
};

const userLine = () => {
  const randomName = faker.name.findName();
  const randomUrl = `https://s3-us-west-1.amazonaws.com/nappbnbreviews/portait${Math.floor(Math.random() * 348)}.jpeg`;
  return `${randomName},${randomUrl}\n`;
};

const headers = {
  reviews: 'id,text,date,accuracy,communication,cleanliness,location,checkIn,value,score,user,room\n',
  rooms: 'id,name,accuracy,communication,cleanliness,location,checkIn,value,score\n',
  users: 'id, username, avatar\n',
};

const startTime = new Date().toTimeString();
function writeNTimes(writer, header, times) {
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      const finalLine = `${i},${reviewLine()}\n`;
      if (i % 500000 === 0) {
        console.log('chunk', i);
      }
      if (i === 0) {
        ok = writer.write(header);
      }
      if (i === times) {
        const endTime = new Date().toTimeString();
        console.log(startTime, endTime);
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
// writeNTimes(fs.createWriteStream('reviews.csv'), headers.reviews, 50000000);
// writeNTimes(fs.createWriteStream('rooms.csv'), headers.rooms, 10000000);
// writeNTimes(fs.createWriteStream('users.csv'), headers.users, 1000000);
