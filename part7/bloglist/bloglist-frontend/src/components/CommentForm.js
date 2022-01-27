import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const blogId = useParams().id
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const updatedBlog = (await blogService.comment(blogId, { comment: comment })).data
    const updatedBlogs = blogs.map(blog => {
      if (blog.id===blogId) {
        return updatedBlog
      } else {
        return blog
      }
    })
    dispatch(setBlogs(updatedBlogs))
  }

  return(
    <>
      <Form className='commentForm' onSubmit={handleSubmit}>
        <Form.Control id='comment' type='text' value={comment} onChange={({ target }) => setComment(target.value)}></Form.Control>
        <Button id='submitCommentButton' type='submit'>add comment</Button>
      </Form>
    </>
  )
}

export default CommentForm