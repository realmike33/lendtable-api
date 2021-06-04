const Mongoose = require('mongoose')

const characterSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
)

const Character = Mongoose.model('character', characterSchema)

module.exports = Character
