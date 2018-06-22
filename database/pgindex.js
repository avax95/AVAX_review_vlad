const pg = require('pg');
const conf = require('./pgconfig');
const path = require('path');


const pool = new pg.Pool(conf);

const dbHandler = function (q) {
  pool.connect((err, client, done) => {
    if (err) {
      console.log(`Can not connect to the DB ${err}`);
    }
    client.query(q, (err, data) => {
      err ? console.log(err) : console.log('sent');
    });
  });
};

module.exports = dbHandler;
