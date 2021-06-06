const Character = require('../src/models/character')
const createCharacter = require('../src/handlers/createCharacter')
const deleteCharacter = require('../src/handlers/deleteCharacter')
const getAllCharacters = require('../src/handlers/getAllCharacters')
const getCharacter = require('../src/handlers/getCharacter')
const updateCharacter = require('../src/handlers/updateCharacter')

describe('Character', () => {
  describe('createCharacter', () => {
    it('creates character', async () => {
      const user = newId()
      const req = {
        userId: user,
        body: {
          name: 'testing',
          stats: {
            str: 5,
            dex: 5,
            con: 5,
            int: 5,
            wis: 5,
            cha: 5,
          },
        },
      }
      const res = {
        status: function (statusCode) {
          expect(statusCode).toEqual(200)
          return this
        },
        send: ({ data }) => {
          expect(data).toBeTruthy()
          expect(data.name).toEqual(req.body.name)
        },
      }
      await createCharacter(req, res)
      const foundCharactar = await Character.findOne({
        createdBy: user,
        name: req.body.name,
      })
        .lean()
        .exec()
      expect(foundCharactar).toBeTruthy()
    })
  })
  describe('deleteCharacter', () => {
    it('deletes character', async () => {
      const user = newId()
      const newChar = await Character.create({
        name: 'testing',
        str: 5,
        dex: 5,
        con: 5,
        int: 5,
        wis: 5,
        cha: 5,
        createdBy: user,
      })
      const req = {
        userId: user,
        params: {
          id: newChar._id.toString(),
        },
      }
      const res = {
        sendStatus: (statusCode) => {
          expect(statusCode).toEqual(204)
        },
      }
      await deleteCharacter(req, res)
      const foundCharactar = await Character.findById(newChar._id).lean().exec()
      expect(foundCharactar).toBeFalsy()
    })
  })
  describe('getAllCharacter', () => {
    it('gets all characters no matter the owner', async () => {
      await Character.create({
        name: 'testing1',
        str: 5,
        dex: 5,
        con: 5,
        int: 5,
        wis: 5,
        cha: 5,
        createdBy: newId(),
      })
      await Character.create({
        name: 'testing1',
        str: 5,
        dex: 5,
        con: 5,
        int: 5,
        wis: 5,
        cha: 5,
        createdBy: newId(),
      })
      const res = {
        status: function (statusCode) {
          expect(statusCode).toEqual(200)
          return this
        },
        send: ({ data }) => {
          expect(data).toBeTruthy()
          expect(data).toHaveLength(2)
        },
      }
      await getAllCharacters({}, res)
    })
  })
  describe('getCharacter', () => {
    it('get character by id and owner', async () => {
      const user = newId()
      const char = await Character.create({
        name: 'testing1',
        str: 5,
        dex: 5,
        con: 5,
        int: 5,
        wis: 5,
        cha: 5,
        createdBy: user,
      })
      await Character.create({
        name: 'testing',
        str: 5,
        dex: 5,
        con: 5,
        int: 5,
        wis: 5,
        cha: 5,
        createdBy: user,
      })
      const req = {
        userId: user,
        params: { id: char._id.toString() },
      }
      const res = {
        status: function (statusCode) {
          expect(statusCode).toEqual(200)
          return this
        },
        send: ({ data }) => {
          expect(data).toBeTruthy()
          expect(data._id.toString()).toEqual(char._id.toString())
        },
      }
      await getCharacter(req, res)
    })
  })
  describe('updateCharacter', () => {
    it('updates character', async () => {
      const user = newId()
      const newChar = await Character.create({
        name: 'testing',
        str: 5,
        dex: 5,
        con: 5,
        int: 5,
        wis: 5,
        cha: 5,
        createdBy: user,
      })
      const req = {
        userId: user,
        body: {
          name: 'testing',
          stats: {
            str: 7,
            dex: 7,
            con: 7,
            int: 7,
            wis: 7,
            cha: 7,
          },
        },
        params: { id: newChar._id.toString() },
      }
      const res = {
        sendStatus: function (statusCode) {
          expect(statusCode).toEqual(200)
        },
      }
      await updateCharacter(req, res)
      const foundCharactar = await Character.findById(newChar._id).lean().exec()
      expect(foundCharactar).toBeTruthy()
      expect(foundCharactar.name).toEqual(newChar.name)
      expect(foundCharactar.str).not.toEqual(newChar.str)
      expect(foundCharactar.dex).not.toEqual(newChar.dex)
      expect(foundCharactar.con).not.toEqual(newChar.con)
    })
  })
})
