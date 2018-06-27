const pg = require('pg');
const conf = require('./pgconfig');

const pool = new pg.Pool(conf);


const getRoomById = async (roomId) => {
  try {
    const { rows } = await pool.query('SELECT * FROM rooms WHERE id = $1', [roomId]);
    return rows[0];
  } catch (err) {
    return err;
  }
};

const getReviewsByRoomId = async (queryObj) => {
  const sql = 'SELECT u."userName", u.avatar, s.date, s."aggregateRate", s.text FROM user_info AS u INNER JOIN single_review AS s ON u.id=s.userid WHERE roomid=$1 ORDER BY date';
  try {
    const { rows } = await pool.query(sql, [queryObj.roomId]);
    return rows;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getRoomById,
  getReviewsByRoomId,
};
