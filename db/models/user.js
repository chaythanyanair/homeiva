const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: Number, required: true },
    favorites: {type: Array, required: false}
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', UserSchema);
