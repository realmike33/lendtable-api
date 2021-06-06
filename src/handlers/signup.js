const User = require('../models/user')
const { createJWT } = require('../utils/jwt')
const signup = async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password) {
    res.sendStatus(400)
    return
  }
  const foundUser = await User.findOne({ userName }).lean().exec()
  if (foundUser) {
    res.sendStatus(400)
    return
  }
  const newUser = await User.create({ userName, password })
  const token = await createJWT(newUser._id.toString())
  res.status(201).send({ token, user: { userName, id: newUser._id } })
}

module.exports = signup
