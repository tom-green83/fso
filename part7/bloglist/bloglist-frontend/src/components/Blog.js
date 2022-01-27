import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import CommentForm from './CommentForm'
import { ListGroup, Button } from 'react-bootstrap'

const Blog = ({ notificationDuration }) => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLike = () => {
    const updatedBlog = {
      likes: blog.likes + 1
    }
    likeBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
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
        })))
      })
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      dispatch(setBlogs(blogs.filter(blog => blog.id !== blogId)))
    }
    catch (exception){
      dispatch(setNotification('blog not found', 'danger', notificationDuration))
    }
    history.push('/blogs')
  }

  // Return null if either blog or user not accessed from redux store yet
  if (!blog || !user){
    return null
  } else {
    const removeButtonStyle = { display: (blog.user.username === user.username) ? '' : 'none' }
    return (
      <div className='blog'>
        <h1>{blog.title} {blog.author}</h1>
        <ListGroup>
          <ListGroup.Item><a href={`${blog.url}`}>{blog.url}</a></ListGroup.Item>
          <ListGroup.Item>
            {blog.likes} likes
            <Button className='likeButton' onClick={handleLike}>like</Button>
          </ListGroup.Item>
          <ListGroup.Item> added by {blog.user.name}</ListGroup.Item>
        </ListGroup>
        <div>
          <Button variant='danger' className='removeButton' style={removeButtonStyle} onClick={handleRemove}>remove</Button>
        </div>
        <h3>comments</h3>
        <CommentForm />
        <div>
          <ListGroup>
            {blog.comments.map((comment, index) =>
              <ListGroup.Item key={index}>
                {comment}
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      </div>
    )

  }

}

export default Blog