const express = require('express');
const tempStorage = require('./tempStorage');
const dbm = require('../database/mindex.js');
const help = require('../helpers/serverHelpers.js');

const router = express.Router();

const roomIdAdjustment = 0;

const getQueryParams = ({ pageonly, start, limit }) => {
  const result = {};
  result.totalNumberResults = tempStorage.totalNumberResults;
  if (!parseInt(pageonly, 10)) {
    result.roomInfo = tempStorage.roomInfo;
  }
  const index = parseInt(start, 10);
  const end = parseInt(limit, 10) + index;
  result.reviews = tempStorage.allQueryReviews.slice(index, end);
  return result;
};

router.get('/:roomId', async (req, res, next) => {
  try {
    let { roomId } = req.params;
    roomId = parseInt(roomId, 10) + roomIdAdjustment;
    // put it into a separate module, and await for responce
    const roomReviews = await dbm.getReviews(roomId);
    res.status(200).json(roomReviews);
  } catch (err) {
    next(err);
  }
});

router.post('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const review = help.newReview(roomId);
    // put it into a separate module, and await for responce
    // roomId = parseInt(roomId, 10) + roomIdAdjustment;
    // const room = db.getRoomById(roomId);
    // const reviews = db.getReviewsByRoomId({ roomId });
    // [tempStorage.roomInfo, tempStorage.allQueryReviews] = await Promise.all([room, reviews]);
    // tempStorage.roomInfo.id = parseInt(tempStorage.roomInfo.id, 10);
    // tempStorage.roomInfo.totalNumberReviews = tempStorage.allQueryReviews.length;
    // tempStorage.totalNumberResults = tempStorage.allQueryReviews.length;
    dbm.postReviews(review);
    const roomReviews = await dbm.getReviews(roomId);
    tempStorage.allQueryReviews.push(review);
    // dbm.getReviews(roomId);
    res.status(200).json(roomReviews);
  } catch (err) {
    next(err);
  }
});

router.delete('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    // put it into a separate module, and await for responce
    // roomId = parseInt(roomId, 10) + roomIdAdjustment;
    // const room = db.getRoomById(roomId);
    // const reviews = db.getReviewsByRoomId({ roomId });
    // [tempStorage.roomInfo, tempStorage.allQueryReviews] = await Promise.all([room, reviews]);
    // tempStorage.roomInfo.id = parseInt(tempStorage.roomInfo.id, 10);
    // tempStorage.roomInfo.totalNumberReviews = tempStorage.allQueryReviews.length;
    // tempStorage.totalNumberResults = tempStorage.allQueryReviews.length;

    // find review by _id, remove it from temp storage;
    // find review and remove it by _id;
    const del = await dbm.deleteReview(roomId);
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
