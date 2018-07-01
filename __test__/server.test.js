const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Test methods', () => {
  beforeAll(() => {
    mongoose.connect('mongodb://localhost/reviews');
  });
  afterAll((done) => {
    mongoose.disconnect('mongodb://localhost/reviews');
    done();
  });
});

describe('Test the room path', () => {
  test('It should response the GET method', async () => {
    const roomId = Math.floor(Math.random() * 10000000);
    const response = await request(app).get(`/reviews/${roomId}`);
    expect(response.statusCode).toBe(200);
  });
  test('It should GET correct room id', async () => {
    const roomId = 3887;
    let response = await request(app).get(`/reviews/${roomId}`);
    response = response.body.roomInfo.roomName;
    console.log(response);
    expect(response).toBe('Intelligent Metal Cheese');
  });
  test('It should response the POST method', async () => {
    const roomId = Math.floor(Math.random() * 10000000);
    const response = await request(app).post(`/reviews/post/${roomId}`);
    expect(response.statusCode).toBe(200);
  });
  test('It should response the DELETE method', async () => {
    const roomId = Math.floor(Math.random() * 10000000);
    const response = await request(app).delete(`/reviews/${roomId}`);
    expect(response.statusCode).toBe(200);
  });
});

