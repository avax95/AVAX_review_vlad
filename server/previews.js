const express = require('express');
conse db = require('../database/pgindex.js');

const router = express.Router();

router.get('/:roomId', (req, res, next) => {
  const { roomId } = req.params;
  const sql = `SELECT * FROM single_review WHERE roomid=${roomId}`;
  db.dbHandle(sql, (err, data) => (err ? res.status(500).send() : res.status(200).send(data)));
  next();
});

router.post('/:roomId', (req, res, next) => {
  const { roomId } = req.params;
  const sql = `INSERT INTO single_review VALUES 23, ${roomId}, some text, 1990-10-04, 1.2, 2.3, 3.4, 4.5, 4.3, 3.2`;
  db.postReview(sql, (err, data) => (err ? res.status(500).send() : res.status(200).send()));
  next();
});

module.exports = router;


