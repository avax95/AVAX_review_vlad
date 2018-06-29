require('newrelic');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./previews'); 

const app = express();
mongoose.connect('mongodb://localhost/reviews');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connection open');
});

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use('/:id', express.static(path.join(__dirname, '../public')));
app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/reviews', router);

const PORT = process.env.PORT || 3009;
const server = http.createServer(app);

module.exports = server;

if (!module.parent) {
  server.listen(PORT);
  console.log(`reviews listening on ${PORT}`);
}
