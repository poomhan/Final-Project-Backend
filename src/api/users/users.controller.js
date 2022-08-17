const User = require('../../models/user')

const getMeError = (req, res) => res.status(500).json({message: 'Server error can\'t get me profile'})
const getMeNotFound = (req, res) => res.status(404).json({message: 'Notfound user', data: null})
const updateProfileError = (req, res) => res.status(500).json({ message: 'Server error update profile' })
const createProfileError = (req, res, message) => res.status(500).json({ message: message || 'Server error create profile' })
const responseSuccess = (req, res, data) => res.status(200).json({
  message: 'success',
  result: data
})

module.exports = {
  async getMe (req, res) {
    // authorization with firebase here
    const user = new User({ email: req.user.email })
    user.me((err, doc) => {
      if (err) return getMeError(req, res);
      if (!doc) return getMeNotFound(req, res)
      responseSuccess(req, res, doc)
    })
  },
  async updateProfile (req, res) {
    const body = req.body

    try {
      await User.updateUser(req.user.email, body)
      responseSuccess(req, res)
    } catch (err) {
      console.log(err)
      updateProfileError(req, res)
    }
  },
  async createProfile (req, res) {
    const body = req.body

    try {
      const user = new User({...body, email: req.user.email})
      await user.createUser()
      responseSuccess(req, res, user)
    } catch (err) {
      console.log(err)
      createProfileError(req, res, err.message)
    }
  }
}
