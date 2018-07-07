const newrelic = require('newrelic');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./previews');

const app = express();

// mongoose.connect('mongodb://localhost/reviews');
const host = process.env.MNG_HOST || 'localhost';
mongoose.connect(`mongodb://${host}/reviews`);

const mongoClient = mongoose.connection;
mongoClient.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoClient.once('open', () => {
  console.log('MongoDB connection open');
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

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/loaderio-eeadf863db02504d34fc369cc7b3f740/', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-eeadf863db02504d34fc369cc7b3f740.txt'));
});
app.get('/loaderio-eeadf863db02504d34fc369cc7b3f740.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-eeadf863db02504d34fc369cc7b3f740.txt'));
});
app.get('/loaderio-eeadf863db02504d34fc369cc7b3f740.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-eeadf863db02504d34fc369cc7b3f740.txt'));
});

app.use('/:id', express.static(path.join(__dirname, '../public')));
app.use('/reviews', router);

const PORT = process.env.PORT || 3009;
const server = http.createServer(app);

module.exports = server;

if (!module.parent) {
  server.listen(PORT);
  console.log(`reviews listening on ${PORT}`);
}
