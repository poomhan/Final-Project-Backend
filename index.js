const dotenv = require('dotenv')
dotenv.config()

require('./src/libs/firebase')

const express = require('express');
const { default: mongoose } = require('mongoose');

const activityRouter = require('./src/api/activities/activities.route');
const userRouter = require('./src/api/users/users.route');
const authMiddleware = require('./src/middleware/authentication')
const cors = require('cors')

const PORT = 8080;

const app = express();

// Middlewares
app.use(cors())
app.use(express.json());

app.use('/api/v1/activities', authMiddleware, activityRouter);
app.use('/api/v1/users', authMiddleware, userRouter);

const start = async () => {
  // DO NOT COMMIT/PUSH USERNAME AND PASSWORD TO Github
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection
  db.once('open', function () {
    console.log("Connected to mongodb successfully")
  })
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
