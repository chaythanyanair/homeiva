const { ApolloServer } = require('apollo-server-express');
const { env } = require('../config/environment');
const schema = require('./schema');
const { decodeToken } = require('../utilities');

const apolloServer = new ApolloServer({
  schema,
  playground: env.development,
  debug: false,
  context : (req) => {
    // JWT authentication
    const decoded = decodeToken(req);
    return { auth: decoded };
  }
});

module.exports = apolloServer;
