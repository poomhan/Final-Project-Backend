const {getAuth} = require("firebase-admin/auth");

const unAuthResponse = () => ({ message: 'Unauthorized token', status: 401 })

const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization')
  if (!token) return res.status(401).json(unAuthResponse())
  const auth = getAuth()
  try {
    req.user = await auth.verifyIdToken(token)
    next()
  } catch (err) {
    console.error(err)
    req.user = null
    res.status(401).json(unAuthResponse())
  }
}

module.exports = authMiddleware
