const fs = require('fs');
const path = require('path');
const psql = require('./pgindex.js');
const mongo = require('./mindex.js');
const { exec } = require('child_process');

const usersPath = path.join(__dirname, '/users.csv');
const reveiwsPath = path.join(__dirname, '/reviews.csv');
const roomsPath = path.join(__dirname, '/rooms.csv');
const testPath = path.join(__dirname, '/test.csv');

const insertUsers = `COPY user_info (id,username,avatar) FROM '${usersPath}' DELIMITER ','`;
const insertReviews = `COPY single_review FROM '${reveiwsPath}' DELIMITER ','`;
const insertRooms = `COPY rooms FROM '${roomsPath}' DELIMITER ','`;

// psql(insertUsers);
// psql(insertReviews);
// psql(insertRooms);

const execReviews = `mongoimport --db reviews --collection reviews --type csv --headerline --file ${reveiwsPath}`;
const execRooms = `mongoimport --db reviews --collection rooms --type csv --headerline --file ${roomsPath}`;
const execUsers = `mongoimport --db reviews --collection users --type csv --headerline --file ${usersPath}`;

// exec(execRooms, (err, stdout, stderr) => {
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });

// exec(execReviews, (err, stdout, stderr) => {
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });

// exec(execUsers, (err, stdout, stderr) => {
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
