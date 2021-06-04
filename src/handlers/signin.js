const User = require('../models/user')
const { createJWT } = require('../utils/jwt')

const signin = async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password) {
    res.sendStatus(400)
    return
  }
  // find user by username
  const foundUser = await User.findOne({ userName }).exec()
  if (!foundUser) {
    res.sendStatus(400)
    return
  }

  // check if password provided matches the user
  const validPassword = foundUser.validPassword(password)
  if (!validPassword) {
    res.sendStatus(400)
    return
  }

  const token = await createJWT(foundUser._id.toString())
  res.status(200).send({ token })
}

module.exports = signin
