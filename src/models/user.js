const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const password = this.password
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(password, 10)
    } catch (e) {
      return next(e)
    }
  }
  return next()
})

userSchema.methods = {
  validPassword: function (textPassword) {
    return bcrypt.compare(textPassword, this.password)
  },
}

const User = mongoose.model('user', userSchema)

module.exports = User
