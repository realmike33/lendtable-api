const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    str: { type: Number, min: 1, max: 20, required: true },
    dex: { type: Number, min: 1, max: 20, required: true },
    con: { type: Number, min: 1, max: 20, required: true },
    int: { type: Number, min: 1, max: 20, required: true },
    wis: { type: Number, min: 1, max: 20, required: true },
    cha: { type: Number, min: 1, max: 20, required: true },
  },
  { timestamps: true }
)

const Character = mongoose.model('character', characterSchema)

module.exports = Character
