const express = require('express')
const { getMe, updateProfile, createProfile } = require('./users.controller')

const router = express.Router();

router.get('/me', getMe)
router.post('/me', createProfile)
router.put('/me', updateProfile)

module.exports = router
