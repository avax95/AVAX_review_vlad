const faker = require('faker');

function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => [err]);
}

function newReview(roomId) {
  const review = {
    text: faker.lorem.paragraph(),
    date: new Date(),
    accuracy: faker.random.number({ min: 1, max: 5 }),
    communication: faker.random.number({ min: 1, max: 5 }),
    cleanliness: faker.random.number({ min: 1, max: 5 }),
    location: faker.random.number({ min: 1, max: 5 }),
    checkIn: faker.random.number({ min: 1, max: 5 }),
    value: faker.random.number({ min: 1, max: 5 }),
    userName: faker.name.findName(),
    avatar: `https://s3-us-west-1.amazonaws.com/nappbnbreviews/portait${Math.floor(Math.random() * 348)}.jpeg`,
    roomId,
  };
  review.aggregateRate = Math.floor((review.accuracy + review.communication + review.cleanliness + review.location + review.checkIn + review.value) / 6);
  return review;
}
module.exports = {
  to,
  newReview,
};
