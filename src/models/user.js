const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema(
  {
    userName: {
      type: String,
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

userSchema.index({ userName: 1 })

export const User = mongoose.model('user', userSchema)
