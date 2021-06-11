const { User, Apartment, ObjectId } = require('../../../db/models');
var zipcodes = require('zipcodes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../config/environment');


const userMutations = {

    signUpUser: async (_, { user }) => {
      const zipCode = zipcodes.lookup(user.zipCode);
      if (!zipCode) {
        return new Error('Invalid zipcode, please use a US zipcode');
      }
      const existingUser = User.find({emailId: user.emailId});
      if (existingUser.length) {
        return new Error('User already exists');
      }
      user.password = bcrypt.hashSync(user.password, 3);
      const newUser = new User(user);
      await newUser.save();
      return {token : jwt.sign(newUser.toJSON(), jwtSecret)};
    },

    loginUser: async (_, { email, password })  => {
      const user = await User.findOne({emailId: email});
      if (!user) {
        throw new Error('Unable to find user with this credentials');
      } 
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid username or password');
      } 
      return {token : jwt.sign(user.toJSON(), jwtSecret)};
    },

    updateUser: async (_, { id, user }, { auth }) => {
      if (!auth) throw new Error('Authentication failed');
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: { ...user },
        },
        { new: true }
      );
  
      return updatedUser;
    },

    addApartmentAsFavorite: async (_, { apartmentId}, { auth }) => {
      if (!auth) throw new Error('Authentication failed');
      const userId = auth._id;
      const apartment = await Apartment.findById(apartmentId);
      let updatedUser;
      if (apartment) {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { $addToSet : { favorites : apartment}},
          {new : true}
        );
      }
      return updatedUser;
    },

    removeApartmentFromFavorite: async (_, { apartmentId}, { auth }) => {
      if (!auth) throw new Error('Authentication failed');
      const userId = auth._id;
      const apartment = await Apartment.findById(apartmentId);
      let updatedUser;
      if (apartment) {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $pull: { 
              favorites: {_id : ObjectId(apartmentId)}
            }
          },
          { new: true }
        );
      }
      return updatedUser;
    },
  };
  
  module.exports = userMutations;
