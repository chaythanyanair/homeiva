const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/environment');

const decodeToken = (req) => {
  const header =  req.req.headers.authorization;
    
  if (header){
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  }
  return null
}
module.exports = { decodeToken }