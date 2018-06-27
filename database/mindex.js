const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reviews');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connection open');
});

const reviewSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  text: String,
  date: Date,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkIn: Number,
  value: Number,
  agregateRate: Number,
  userName: String,
  avatar: String,
  room: Number,
});

// db.rooms.insert({
//   id: 1,
//   text: "Generic Soft Salad",
//   accuracy: 3,
//   communication: 4,
//   cleanliness: 4,
//   location: 2,
//   checkIn: 2,
//   value: 5,
//   agregateRate: 3,
//   reviews:[{id: 32425},{id: 23},{id: 456837},{id: 12345},{id: 6898765},{id:323},{id:4},{id:56},{id:2},{id:34}],
// })

const roomSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkIn: Number,
  value: Number,
  agregateRate: Number,
});

roomSchema.virtual('allReviews', {
  ref: 'Review',
  localField: 'id',
  foreignField: 'room',
  justOne: false,
});

roomSchema.set('toObject', { virtuals: true });
roomSchema.set('toJSON', { virtuals: true });
reviewSchema.plugin(uniqueValidator);
roomSchema.plugin(uniqueValidator);

const Review = mongoose.model('Review', reviewSchema);
const Room = mongoose.model('Room', roomSchema);
// const insertReviews = (review, callback) => {
//   const newReview = new Review({
//     id: review.id,
//     text: review.text,
//     date: review.date,
//     accuracy: review.accuracy,
//     communication: review.communication,
//     cleanliness: review.cleanliness,
//     location: review.location,
//     checkIn: review.checkIn,
//     value: review.value,
//     score: review.score,
//   });

//   Review.create(newReview, (err, data) => (err ? callback(err, null) : callback(null, data)));
// };

module.exports = {
  Review, Room,
};
