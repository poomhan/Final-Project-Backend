const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    topic: { type: String, min: 5, max: 20, required: true },
    type: { type: String, enum: ['running', 'swimming', 'hiking', 'biking'], required: true },
    date: { type: Date, required: true },
    calories: { type: Number, required: true },
    duration: { type: Number, required: true }, // in second 600 = 10 min
    description: String,
    userEmail: { type: String, required: true }
  },
  {
    _id: true,
    timestamps: true,
    statics: {
      async findByType (type) {
        return this.find({ type });
      },
      async findByUserEmail (email) {
        return this.find({ userEmail: email }).sort({createdAt: -1})
      },
      async updateActivity ({userEmail, id: _id}, {topic, description, duration, date, type, calories}) {
        console.log('update', {userEmail, _id})
        return this.updateOne({ _id, userEmail }, {topic, description, duration, date, type, calories})
      }
    },
  }
);

const ActivityModel = mongoose.model('activities', activitySchema);

module.exports = ActivityModel;
