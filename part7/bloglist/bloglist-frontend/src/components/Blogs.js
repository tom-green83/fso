import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'



const Blogs = ( { notificationDuration }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)

  const addBlog = (newObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('posting new blog as', user.username)
    blogService
      .create(newObject)
      .then(returnedObject => {
        dispatch(setBlogs(blogs.concat(returnedObject)))
        dispatch(setNotification(`a new blog ${returnedObject.title} by ${returnedObject.author} added`, 'success', notificationDuration))
      })
  }

  const likeBlog = (blogId, updatedBlog) => {
    blogService
      .update(blogId, updatedBlog)
      .then(returnedObject => {
        dispatch(setBlogs(blogs.map(blog => {
          if (blog.id === blogId) {
            const likedBlog = JSON.parse(JSON.stringify(blog))
            likedBlog.likes = returnedObject.likes
            return likedBlog
          } else {
            return blog
          }
        })
          .sort((a, b) => b.likes - a.likes)
        ))
      })
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      dispatch(setBlogs(blogs.filter(blog => blog.id !== blogId)))
    }
    catch (exception){
      dispatch(setNotification('blog not found', 'error', notificationDuration))
    }
  }

  // Stop app crashing if '/blogs accessed' without logging in
  if (user===null) {
    return (
      <Link to="/login">login</Link>
    )
  }

  return(
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} user={user} removeBlog={removeBlog}/>
      )}
    </div>
  )
}


export default Blogs