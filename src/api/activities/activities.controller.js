const ActivityModel = require("../../models/activity")

const responseSuccess = (req, res, data) => res.status(200).json({
  message: 'success',
  result: data
})

module.exports = {
  async createActivity (req, res) {
    const activity = new ActivityModel({
      ...req.body,
      userEmail: req.user.email
    });
    const validateResult = activity.validateSync();
    if (validateResult) {
      return res.status(400).send(validateResult);
    }
    await activity.save();
    return responseSuccess(req, res, activity.toJSON())
  },
  async updateActivity (req, res) {
    try {
      const id = req.params.activityId
      if (!id) throw new Error('id not defined')
      await ActivityModel.updateActivity({id, userEmail: req.user.email}, req.body)
      responseSuccess(req, res)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Update activity failed'
      })
    }
  },
  async getActivities (req, res) {
    const activities = await ActivityModel.findByUserEmail(req.user.email);
    responseSuccess(req, res, activities)
  },
  async getActivityById(req, res) {
    const activity = await ActivityModel.findById(req.params.activityId);
    if (!activity) {
      return res.status(404).end();
    }
    responseSuccess(req, res, activity)
  },
  async deleteActivity (req, res) {
    const activityId = req.params.activityId
    try {
      console.log({ activityId, email: req.user.email })
      await ActivityModel.deleteOne({ _id: activityId, userEmail: req.user.email })
      responseSuccess(req, res)
    } catch (err) {
      res.status(500).json({ message: 'Error delete activity'})
    }
  }
}
