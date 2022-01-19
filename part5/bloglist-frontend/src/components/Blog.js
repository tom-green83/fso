import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, user, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = { display: (blog.user.username === user.username) ? '' : 'none' }

  // Define details to show when "view" is clicked
  const details = () => {
    if (showDetails) {
      return (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button style={removeButtonStyle} onClick={handleRemove}>remove</button>
        </div>
      )
    }
  }

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

  return (
    <div style ={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
      {details()}
    </div>
  )
}

export default Blog