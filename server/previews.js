const express = require('express');
const clientMongo = require('../database/mindex.js');
const clientRedis = require('../database/rindex.js');
const help = require('../helpers/serverHelpers.js');
let ts = require('./tempStorage.js');

const router = express.Router();

const roomIdAdjustment = 0;

const getQueryParams = ({ pageonly, start, limit }) => {
  const result = {};
  result.totalNumberResults = ts.totalNumberResults;
  console.log(ts.allQueryReviews.length);
  if (!parseInt(pageonly, 10)) {
    result.roomInfo = ts.roomInfo[0];
  }
  const index = parseInt(start, 10);
  const end = parseInt(limit, 10) + index;
  result.reviews = ts.allQueryReviews.slice(index, end);
  return result;
};

const cache = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    let data = await clientRedis.get(roomId);
    if (data != null) {
      data = JSON.parse(data);
      ts = data;
      res.status(200).json(getQueryParams(req.query));
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
    const roomInfo = clientMongo.getRoomInfo(roomId);
    const reviews = clientMongo.getReviews(roomId);
    [ts.roomInfo, ts.allQueryReviews] = [await roomInfo, await reviews];
    ts.totalNumberResults = ts.allQueryReviews.length;
    ts.roomInfo[0].totalNumberReviews = ts.allQueryReviews.length;
    const roomReviews = JSON.stringify(getQueryParams(req.query));
    clientRedis.setex(roomId, 100, roomReviews);
    res.status(200).json(getQueryParams(req.query));
  } catch (err) {
    next(err);
  }
});

// router.post('/:roomId', async (req, res, next) => {
//   try {
//     const { roomId } = req.params;
//     const review = help.newReview(roomId);
//     roomId = parseInt(roomId, 10) + roomIdAdjustment;
//     const room = db.getRoomById(roomId);
//     const reviews = db.getReviewsByRoomId({ roomId });
//     [ts.roomInfo, ts.allQueryReviews] = await Promise.all([room, reviews]);
//     ts.roomInfo.id = parseInt(ts.roomInfo.id, 10);
//     ts.roomInfo.totalNumberReviews = ts.allQueryReviews.length;
//     ts.totalNumberResults = ts.allQueryReviews.length;
//     await clientMongo.postReviews(review);
//     const roomReviews = await clientMongo.getReviews(roomId);
//     // clientMongo.getReviews(roomId);
//     res.status(200).json(roomReviews);
//   } catch (err) {
//     next(err);
//   }
// });

router.post('/post/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const review = help.newReview(roomId);
    await clientMongo.postReviews(review);
    const roomReviews = await clientMongo.getReviews(roomId);
    res.status(200).json(roomReviews);
  } catch (err) {
    next(err);
  }
});

router.delete('/:roomId', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const del = await clientMongo.deleteReview(roomId);
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
