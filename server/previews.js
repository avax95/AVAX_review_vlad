const express = require('express');
const clientMongo = require('../database/mindex.js');
const clientRedis = require('../database/rindex.js');
const create = require('../helpers/serverHelpers.js');

const router = express.Router();

const reviewsForCurrPage = ({ pageonly, start, limit }, roomBundle) => {
  const index = parseInt(start, 10);
  const end = parseInt(limit, 10) + index;
  return {
    totalNumberResults: roomBundle.totalNumberResults,
    roomInfo: roomBundle.roomInfo[0],
    reviews: roomBundle.reviews.slice(index, end),
  };
};

const cache = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    let roomBundle = await clientRedis.get(roomId);
    if (roomBundle != null) {
      roomBundle = JSON.parse(roomBundle);
      res.status(200).json(reviewsForCurrPage(req.query, roomBundle));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

router.get('/:roomId', cache, async (req, res, next) => {
  try {
    let { roomId } = req.params;
    roomId = parseInt(roomId, 10);
    const roomInfo = clientMongo.getRoomInfo(roomId);
    const reviews = clientMongo.getReviews(roomId);
    const roomBundle = {};
    [roomBundle.roomInfo, roomBundle.reviews] = [await roomInfo, await reviews];
    roomBundle.totalNumberResults = roomBundle.reviews.length;
    roomBundle.roomInfo[0].totalNumberReviews = roomBundle.reviews.length;
    clientRedis.setex(roomId, 100, JSON.stringify(roomBundle));
    res.status(200).json(reviewsForCurrPage(req.query, roomBundle));
  } catch (err) {
    next(err);
  }
});

// router.post('/:roomId', async (req, res, next) => {
//   try {
//     const { roomId } = req.params;
//     const review = create.newReview(roomId);
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
    const review = create.newReview(roomId);
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
