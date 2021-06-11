const { Apartment } = require('../../../db/models');
var zipcodes = require('zipcodes');


const apartmentQueries = {

    apartments: async (_, args, { auth }) => {
      if (!auth) throw new Error('Authentication failed');
      const apartments = await Apartment.find();
      return apartments;
    },

    apartment: async (_, { id }) => {
      const apartment = await Apartment.findById(id);
      return apartment;
    },

    searchApartment: async (_, { city, country, rooms }, { auth }) => {
      if (!auth) throw new Error('Authentication failed');
      const apartments = await Apartment.find({
       $or : [
        { city : city },
        { country : country },
        { rooms : rooms}
       ]
      });
      return apartments;
    },

    searchApartmentByDistance: async (_, { zipcode, distance }, { auth }) => {
      if (!auth) throw new Error('Authentication failed');
      var zipcodesInRadius = zipcodes.radius(zipcode, distance);
      const apartments = await Apartment.find({
        zipCode: {$in: zipcodesInRadius}
      });
      return apartments;
    },
  };
  
module.exports = apartmentQueries;
