const Character = require('../models/character')
const createCharacter = async (req, res) => {
  const { stats, name } = req.body
  if (!stats || Object.keys(stats).length !== 6 || !name) {
    res.sendStatus(400)
    return
  }
  const newChar = await Character.create({
    name,
    ...stats,
    createdBy: req.userId,
  })
  res.status(200).send({ data: newChar })
}

module.exports = createCharacter
