import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Blogs = ( { notificationDuration }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const history = useHistory()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addBlog = (newObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('posting new blog as', user.username)
    blogService
      .create(newObject)
      .then(returnedObject => {
        dispatch(setBlogs(blogs.concat(returnedObject)))
        dispatch(setNotification(`a new blog ${returnedObject.title} by ${returnedObject.author} added`, 'success', notificationDuration))
      })
    history.push('/blogs')
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
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>

      )}
    </div>
  )
}


export default Blogs