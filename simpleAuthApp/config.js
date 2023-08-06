require('dotenv').config();

const config = {
   
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    SECRETKEY: process.env.SECRETKEY
    
  };
  
  module.exports = config;