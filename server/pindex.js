const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const previewsRouter = require('./previews');

const app = express();

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

app.use('/:roomId', express.static(path.join(__dirname, '../public')));

app.use('/reviews', previewsRouter);

const PORT = process.env.PORT || 3009;

app.listen(PORT, () => {
  console.log('server listening on port ', PORT);
});
