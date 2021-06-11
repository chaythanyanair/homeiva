const { apartmentQueries, apartmentMutations } = require('./apartment');
const { userQueries, userMutations } = require('./user');

const resolvers = {
  Query: {
    ...userQueries,
    ...apartmentQueries,
  },
  Mutation: {
    ...userMutations,
    ...apartmentMutations,
  },
};

module.exports = resolvers;