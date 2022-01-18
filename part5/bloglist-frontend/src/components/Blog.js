import React, { useState } from 'react'

const Blog = ({blog, updateBlog}) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
        </div>          
      )
    }
  }

  const handleLike = () => {
    const updatedBlog = {
      likes: blog.likes + 1
    }
    //   JSON.parse(JSON.stringify(blog))
    // updatedBlog.likes += 1
    // console.log(blog, updatedBlog)}
    updateBlog(blog.id, updatedBlog)
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