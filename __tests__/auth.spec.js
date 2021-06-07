const User = require('../src/models/user')
const signin = require('../src/handlers/signin')
const signup = require('../src/handlers/signup')

describe('Auth', () => {
  describe('signin', () => {
    it('creates and responds with jwt', async () => {
      const userObj = { userName: 'testing', password: '123pass' }
      await User.create(userObj)
      const req = {
        body: userObj,
      }
      const res = {
        status: function (statusCode) {
          expect(statusCode).toEqual(200)
          return this
        },
        send: ({ token }) => {
          expect(token).toBeTruthy()
        },
      }
      await signin(req, res)
    })
  })
  describe('signup', () => {
    it('creates user', async () => {
      const req = {
        body: { userName: 'testing', password: '123pass' },
      }
      const res = {
        status: function (statusCode) {
          expect(statusCode).toEqual(201)
          return this
        },
        send: ({ token }) => {
          expect(token).toBeTruthy()
        },
      }
      await signup(req, res)
    })
  })
})
