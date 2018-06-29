const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;

const reviewSchema = mongoose.Schema({
  text: String,
  date: Date,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkIn: Number,
  value: Number,
  aggregateRate: Number,
  userName: String,
  avatar: String,
  roomId: Number,
});

const roomSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  roomName: String,
  totalNumberReviews: Number,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkIn: Number,
  value: Number,
  agregateRate: Number,
});

roomSchema.virtual('reviews', {
  ref: 'Review',
  localField: 'id',
  foreignField: 'roomId',
  justOne: false,
});

roomSchema.set('toObject', { virtuals: true });
roomSchema.set('toJSON', { virtuals: true });
reviewSchema.plugin(uniqueValidator);
roomSchema.plugin(uniqueValidator);

const Review = mongoose.model('Review', reviewSchema);
const Room = mongoose.model('Room', roomSchema);

const getReviews = roomId => Room.find({ id: roomId }, { _id: 0 }).populate('reviews', 'userName avatar aggregateRate text').exec();
const postReviews = review => Review.create(review);
const deleteReview = roomId => Review.findOneAndRemove({ roomId });

module.exports = {
  Review, Room, getReviews, postReviews, deleteReview,
};
