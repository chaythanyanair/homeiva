const express = require('express');
const graphqlServer = require('./graphql');

const app = express();

graphqlServer.applyMiddleware({
    app,
  });

module.exports = app;