const path = require('path');
const db = require('./pgindex.js');

const userInfoPath = path.join(__dirname, '/userinfo.csv');
const reveiwsPath = path.join(__dirname, '/reviews.csv');
const roomsPath = path.join(__dirname, '/rooms.csv');
const testPath = path.join(__dirname, '/test.csv');

const query = `COPY user_info (id,username,avatar) FROM '${userInfoPath}' DELIMITER ','`;
const insertReviews = `COPY single_review FROM '${reveiwsPath}' DELIMITER ','`;
const insertRooms = `COPY rooms FROM '${roomsPath}' DELIMITER ','`;
const test = `COPY test FROM '${testPath}' DELIMITER ','`;
// const truncate = `TRUNCATE single_review CASCADE`;
// const queryTo = `INSERT INTO user_info VALUES (1, 'ran', 'url')`;
// const test = `INSERT INTO test VALUES (default, 'val')`;
// const test2 = `INSERT INTO single_review VALUES (default, 'Veniam corporis harum.',1995-11-5,4,2,3,1,3,2,2,815284,8584888
// )`;
db(insertReviews);
