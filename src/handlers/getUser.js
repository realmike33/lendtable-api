const User = require('../models/user')
const getUser = async (req, res) => {
  const foundUser = await User.findById(req.userId).lean().exec()
  if (!foundUser) {
    res.sendStatus(404)
    return
  }
  res
    .status(200)
    .send({ data: { id: foundUser._id, userName: foundUser.userName } })
}

module.exports = getUser
