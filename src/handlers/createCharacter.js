const Character = require('../models/character')

const createCharacter = async (req, res) => {
  const { stats, name, avatar } = req.body
  if (!stats || Object.keys(stats).length === 6 || !name || !avatar) {
    res.sendStatus(400)
    return
  }
  await Character.create({ name, avatar, ...stats })
  res.sendStatus(200)
}

module.exports = createCharacter
