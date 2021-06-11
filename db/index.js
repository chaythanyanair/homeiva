const Mongoose = require('mongoose');
const { mongo } = require('../config/environment');

let isConnected;
let db;

const connectDB = async () => {
  if (isConnected) return db;

  try {
    console.log("Mongo URL:", mongo.url)
    db = await Mongoose.connect(mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    isConnected = db.connections[0].readyState;
    return db;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = connectDB;
