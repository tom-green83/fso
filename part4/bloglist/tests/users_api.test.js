const { describe } = require('eslint/lib/rule-tester/rule-tester')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./users_api_helper')

beforeEach (async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers.map(initialUser => new User(initialUser))
  const promiseArray = userObjects.map(userObject => userObject.save())
  await Promise.all(promiseArray)
})

describe('adding a user', () => {
  test('returns added user', async () => {
    const userToAdd = helper.userToAdd
    const savedUser = (await api.post('/api/users').send(userToAdd)).body
    expect(savedUser.username).toEqual(userToAdd.username)
    expect(savedUser.name).toEqual(userToAdd.name)
  })
})

afterAll(() => {
  mongoose.connection.close()
})