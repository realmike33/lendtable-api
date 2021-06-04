const Mongoose = require('mongoose')
const User = require('./src/models/user')
const Character = require('./src/models/character')
const config = require('./config')

const dbmodels = [Character, User]
// jest.setTimeout(60000)

global.newId = () => {
  return Mongoose.Types.ObjectId()
}

const remove = (model) => model.deleteMany({})

const clearDB = async () => {
  await Promise.all(dbmodels.map(remove))
}

beforeAll((done) => {
  Mongoose.connect(
    config.db.testUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async (e) => {
      if (!e) {
        await Promise.all(dbmodels.map((m) => m.init()))
        await clearDB()
        done()
      }
    }
  )
})

afterEach((done) => {
  clearDB().then(done)
})

afterAll((done) => {
  Mongoose.disconnect((e) => {
    if (!e) done()
  })
})
