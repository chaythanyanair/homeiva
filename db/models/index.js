const User= require('./user');
const Apartment= require('./apartment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  User: User,
  Apartment: Apartment,
  ObjectId: ObjectId
}
