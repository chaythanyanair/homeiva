const { Schema, model } = require('mongoose');

const ApartmentSchema = new Schema(
  {
    name: { type: String, required: false },
    rooms: { type: Number, required: false },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Apartment', ApartmentSchema);
