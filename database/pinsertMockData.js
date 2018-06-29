const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const reveiwsPath = path.join(__dirname, '/reviews1.csv');
const roomsPath = path.join(__dirname, '/rooms.csv');

const execReviews = `mongoimport --db reviews --collection reviews --type csv --headerline --file ${reveiwsPath}`;
const execRooms = `mongoimport --db reviews --collection rooms --type csv --headerline --file ${roomsPath}`;

// exec(execReviews, (err, stdout, stderr) => {
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });

exec(execRooms, (err, stdout, stderr) => {
  if (err) {
    console.log('err: ', err);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
