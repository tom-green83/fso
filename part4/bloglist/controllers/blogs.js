const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
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

    // Add user info to blog before saving
    const user = await User.findOne({}) // Find a random user to define as creator of note
    blog.user = user._id    
    const savedBlog = await blog.save()

    // Update user to include new blog id
    user.blogs = user.blogs.concat(user.blogs)
    await user.save()
    response.status(201).json(savedBlog)
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