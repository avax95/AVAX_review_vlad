const express = require('express');
const tempStorage = require('./tempStorage');
const db = require('../database/pgindex.js');
const dbm = require('../database/mindex.js');


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
    dbm.Room.find({ id: roomId }).populate('allReviews').exec((err, data) => (
      err ? res.status(404) :
        res.status(200).json({
          data,
        })
    ));
  } catch (err) {
    next(err);
  }
});

// router.get('/:roomId', async (req, res, next) => {
//   try {
//     let { roomId } = req.params;
//     roomId = parseInt(roomId, 10) + roomIdAdjustment;
//     const room = db.getRoomById(roomId);
//     const reviews = db.getReviewsByRoomId({ roomId });
//     [tempStorage.roomInfo, tempStorage.allQueryReviews] = await Promise.all([room, reviews]);
//     tempStorage.roomInfo.id = parseInt(tempStorage.roomInfo.id, 10);
//     tempStorage.roomInfo.totalNumberReviews = tempStorage.allQueryReviews.length;
//     tempStorage.totalNumberResults = tempStorage.allQueryReviews.length;
//     res.status(200).json(getQueryParams(req.query));
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
