const { User } = require('../../../db/models');

const userQueries = {
    users: async (_, args, {auth}) => {
      if (!auth) throw new Error('Authentication failed');
      const users = await User.find();
      return users;
    },
    user: async (_, {id}, {auth}) => {
      if (!auth) throw new Error('Authentication failed');
      const user = await User.findById(id);
      return user;
    },
  };
  
module.exports = userQueries;
