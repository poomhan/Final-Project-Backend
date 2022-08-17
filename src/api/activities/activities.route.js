const express = require('express');
const ActivityModel = require('../../models/activity');
const {createActivity, getActivities, deleteActivity, getActivityById, updateActivity} = require("./activities.controller");

const router = express.Router();

router.get('/', getActivities);

router.get('/:activityId', getActivityById);

router.post('/', createActivity);

router.put('/:activityId', updateActivity);

router.delete('/:activityId', deleteActivity);

module.exports = router;
