import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

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
      <Form className='blogForm' onSubmit={handleSubmit}>
        <Form.Label>title:</Form.Label>
        <Form.Control id='title' type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)}/>
        <Form.Label>author:</Form.Label>
        <Form.Control id='author' type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)}/>
        <Form.Label>url:</Form.Label>
        <Form.Control id='url' type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)}/>
        <Button id='submitBlogButton' style= {{ marginBottom: 1 }} type='submit'>create</Button>
      </Form>
    </>
  )}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm