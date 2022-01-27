import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'

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
      <form className='commentForm' onSubmit={handleSubmit}>
        <input id='comment' type='text' value={comment} onChange={({ target }) => setComment(target.value)}></input>
        <button id='submitCommentButton' type='submit'>add comment</button>
      </form>
    </>
  )
}

export default CommentForm