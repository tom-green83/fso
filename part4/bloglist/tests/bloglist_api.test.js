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
    const blog = (await api.post('/api/blogs').send(helper.newBlog)).body
    delete blog.id  // Remove id field which doesn't exist in post request
    expect(blog).toEqual(helper.newBlog)
  })

  test('increases blog count by 1', async () => {
    await api.post('/api/blogs').send(helper.newBlog)
    const blogs = (await api.get('/api/blogs')).body
    expect(blogs).toHaveLength(helper.initialBlogs.length +1 )
  })
})

test('post with no likes information defaults to 0 likes', async () => {
  const blog = (await api.post('/api/blogs').send(helper.blogWithNoLikesInfo)).body
  expect(blog.likes).toEqual(0)
})

test('post with no title  and url missing is reponded with status code 400', async () => {
  const response = await api.post('/api/blogs').send(helper.blogWithoutTitleAndUrl)
  expect(response.status).toEqual(400)
})

test('deleting a blog', async () => {
  await api.delete(`/api/blogs/${helper.blogToDelete._id}`)
  const blogs = (await api.get('/api/blogs')).body
  expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
  const ids = blogs.map(blog => blog.id)  
  expect(ids).not.toContain(helper.blogToDelete.id)
})

afterAll(() => {
  mongoose.connection.close()
})