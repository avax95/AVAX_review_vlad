const fs = require('fs');
const faker = require('faker');
const path = require('path');

// ____________________user_info_______________
// const userInfo = function (i) {
//   const randomName = faker.name.findName();
//   const randomUrl = `https://s3-us-west-1.amazonaws.com/nappbnbreviews/portait${Math.floor(Math.random() * 348)}.jpeg`;
//   return `${i},${randomName},${randomUrl}\n`;
// };

// for (let i = 0; i < 1000000; i++) {
//   fs.appendFileSync('userinfo.csv', userInfo(i), (err) => {
//     if (err) throw err;
//     console.log('Saved!');
//   });
// }

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
  totalNumberReviews;

const reviewLine = () => {
  text = faker.lorem.paragraph();
  date = generateDateString();
  accuracy = faker.random.number({ min: 1, max: 5 });
  communication = faker.random.number({ min: 1, max: 5 });
  cleanliness = faker.random.number({ min: 1, max: 5 });
  location = faker.random.number({ min: 1, max: 5 });
  checkIn = faker.random.number({ min: 1, max: 5 });
  value = faker.random.number({ min: 1, max: 5 });
  userId = faker.random.number({ min: 0, max: 1000000 });
  roomId = faker.random.number({ min: 0, max: 10000000 });
  score = Math.floor((accuracy + communication + cleanliness + location + checkIn + value) / 6);
  return `${text},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value},${score},${userId},${roomId}`;
};

const roomLine = () => {
  roomName = faker.lorem.word();
  totalNumberReviews = faker.random.number({ min: 1, max: 200 });
  accuracy = faker.random.number({ min: 1, max: 5 });
  communication = faker.random.number({ min: 1, max: 5 });
  cleanliness = faker.random.number({ min: 1, max: 5 });
  location = faker.random.number({ min: 1, max: 5 });
  checkIn = faker.random.number({ min: 1, max: 5 });
  value = faker.random.number({ min: 1, max: 5 });
  return `${roomName},${totalNumberReviews},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}`;
};

const testLine = () => {
  // const text = faker.lorem.paragraph().replace(/(\r\n|\n|\r)/gm,'');
  const text = faker.lorem.paragraph();
  return `${text}`;
};

function writeNTimes(writer, times) {
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      const finalLine = `${i},${reviewLine()}\n`;
      if (i % 500 === 0) {
        console.log('chunk', i);
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
writeNTimes(fs.createWriteStream('reviews.csv'), 50000000);
// console.log(reviewLine());
