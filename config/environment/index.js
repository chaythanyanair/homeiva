const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  MONGO_ROOT_USERNAME,
  MONGO_ROOT_PASSWORD,
  MONGO_ROOT_DATABASE
} = process.env;

const mongo = {
  url:  `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
  user: MONGO_ROOT_USERNAME,
  password: MONGO_ROOT_PASSWORD,
  db: MONGO_ROOT_DATABASE,
  host: MONGO_HOSTNAME,
  port: MONGO_PORT
};

module.exports = {
    port: port,
    env: env,
    mongo: mongo,
    jwtSecret: jwtSecret
};
