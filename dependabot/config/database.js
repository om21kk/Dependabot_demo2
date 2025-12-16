const mongoose = require('mongoose');
const mysql = require('mysql2');
const redis = require('redis');

const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/testdb');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

const redisClient = redis.createClient();

module.exports = {
  connectMongoDB,
  mysqlConnection,
  redisClient
};