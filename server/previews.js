const express = require('express');
const tempStorage = require('./tempStorage');
const clientMongo = require('../database/mindex.js');
const clientRedis = require('../database/rindex.js');
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

const cache = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const data = await clientRedis.get(roomId);
    if (data != null) {
      res.send(data);
    } else {
      next();
    }
  } catch (err) {
    next();
  }
};

router.get('/:roomId', cache, async (req, res, next) => {
  try {
    let { roomId } = req.params;
    roomId = parseInt(roomId, 10) + roomIdAdjustment;
    const roomReviews = await clientMongo.getReviews(roomId);
    clientRedis.setex(roomId, 1, roomReviews);
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
    clientMongo.postReviews(review);
    const roomReviews = await clientMongo.getReviews(roomId);
    tempStorage.allQueryReviews.push(review);
    // clientMongo.getReviews(roomId);
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
    const del = await clientMongo.deleteReview(roomId);
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
