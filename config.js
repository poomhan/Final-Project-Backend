require("dotenv").config();

const config = {
  port: +process.env.PORT || 8080,
  mongodb: {
    uri: process.env.MONGODB_URI,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
  isVercel: process.env.IS_VERCEL || false,
};

module.exports = config;
