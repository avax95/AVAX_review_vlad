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
  score: Number,
  user: { type: Number, field: 'id', ref: 'User' },
  room: { type: Number, field: 'id', ref: 'Room' },
});

const roomSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkIn: Number,
  value: Number,
  score: Number,
});

const userSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  username: String,
  avatar: String,
});

reviewSchema.plugin(uniqueValidator);
roomSchema.plugin(uniqueValidator);
userSchema.plugin(uniqueValidator);

const Review = mongoose.model('Review', reviewSchema);
const Room = mongoose.model('Room', roomSchema);
const User = mongoose.model('User', userSchema);

const insertReviews = (review, callback) => {
  const newReview = new Review({
    id: review.id,
    text: review.text,
    date: review.date,
    accuracy: review.accuracy,
    communication: review.communication,
    cleanliness: review.cleanliness,
    location: review.location,
    checkIn: review.checkIn,
    value: review.value,
    score: review.score,
  });

  Review.create(newReview, (err, data) => (err ? callback(err, null) : callback(null, data)));
};

module.exports = {
  Review, Room, User, insertReviews,
};
