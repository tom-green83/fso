const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// Initialise remote DB
beforeEach (async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(initialBlog => new Blog(initialBlog))
  const promiseArray = blogObjects.map(blogObject => blogObject.save())
  await Promise.all(promiseArray)
})

describe('get request to /api/blogs', () => {
  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

test('every blog on database has an id', async () => {
  const blogs = (await api.get('/api/blogs')).body
  const promiseArray = blogs.map(blog => {
    expect(blog.id).toBeDefined()
  })
  await Promise.all(promiseArray)
})

describe('post request to /api/blogs', () => {  
  test('returns the blog posted', async () => {
    const response = (await api.post('/api/blogs').send(helper.newBlog)).body
    delete response.id  // Remove id field which doesn't exist in post request
    expect(response).toEqual(helper.newBlog)
  })

  test('increases blog count by 1', async () => {
    await api.post('/api/blogs').send(helper.newBlog)
    const blogs = (await api.get('/api/blogs')).body
    expect(blogs).toHaveLength(helper.initialBlogs.length +1 )
  })
})

test('post with no likes information defaults to 0 likes', async () => {
  const response = (await api.post('/api/blogs').send(helper.blogWithNoLikesInfo)).body
  expect(response.likes).toEqual(0)
})

afterAll(() => {
  mongoose.connection.close()
})