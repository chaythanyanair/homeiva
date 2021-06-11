const { Apartment } = require('../../../db/models');
var zipcodes = require('zipcodes');
const { UserInputError } = require('apollo-server-express');


const apartmentMutations = {

    createApartment: async (_, { apartment }, { auth }) => {
      if (!auth) throw new Error('Authentication failed');
      const zipCode = zipcodes.lookup(apartment.zipCode);
      if (!zipCode) {
        throw new UserInputError('Invalid zipcode, please use a US zipcode');
      }
      const userId = auth._id;
      apartment.userId = userId;
      const newApartment = new Apartment(apartment);
      return newApartment.save();
    },

    updateApartment: async (_, {id, apartment }, { auth }) => {
      const zipCode = zipcodes.lookup(apartment.zipCode);
      if (!zipCode) {
        throw new UserInputError('Invalid zipcode, please use a US zipcode');
        return;
      }
      const updatedApartment = await Apartment.findByIdAndUpdate(
        id,
        {
          $set: { ...apartment },
        },
        { new: true }
      );
  
      return updatedApartment;
    },
  };
  
  module.exports = apartmentMutations;
