const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../constants')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  console.log(token)
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: 'Login Required'
    })
  }
}
