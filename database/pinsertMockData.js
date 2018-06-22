const path = require('path');
const db = require('./pgindex.js');

const userInfoPath = path.join(__dirname, '/userinfo.csv');
const reveiwsPath = path.join(__dirname, '/reviews.csv');

const query = `COPY user_info (id,username,avatar) FROM '${userInfoPath}' DELIMITER ','`;
const insertReviews = `COPY single_review FROM '${reveiwsPath}' DELIMITER ','`;
const truncate = `TRUNCATE single_review CASCADE`;
const queryTo = `INSERT INTO user_info VALUES (1, 'ran', 'url')`;
db(insertReviews);
