const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  // Check for missing title and url
  if((typeof(blog.title) === 'undefined') && (typeof(blog.url) === 'undefined')) {
    response.status(400).end()
  }
  else {
    // Check for missing likes
    if (typeof(blog.likes) === 'undefined') {
      blog.likes = 0
    }
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter