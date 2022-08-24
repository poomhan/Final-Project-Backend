const app = require("./api/index.js");
const dotenv = require("dotenv");
const admin = require("firebase-admin");

const config = require("./config.js");

// require('./src/libs/firebase')

const { default: mongoose } = require("mongoose");

const start = async () => {
  // DO NOT COMMIT/PUSH USERNAME AND PASSWORD TO Github
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;
  db.once("open", function () {
    console.log("Connected to mongodb successfully");
  });
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });

  const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

start();
