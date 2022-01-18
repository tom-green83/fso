import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') 

  const handleSubmit = event => {    
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    addBlog(newObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
  <>
    <h2>create new</h2>
    <form onSubmit={handleSubmit}>
      <div>
        title:<input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)}/>
      </div>
      <div>
        author:<input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)}/>
      </div>
      <div>
        url:<input type='text' value={url} name='Url' onChange={({target}) => setUrl(target.value)}/>
      </div>
      <button type='submit'>create</button>
    </form>
  </>    
)}

export default BlogForm