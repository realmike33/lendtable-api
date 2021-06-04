const User = require('../models/user')

const signin = async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password) {
  }
  // find user by username
  const foundUser = await User.findOne({ userName }).exec()
  if (!foundUser) {
  }

  // check if password provided matches the user
  const validPassword = foundUser.validPassword(password)
  if (!validPassword) {
  }
}

module.exports = signin
