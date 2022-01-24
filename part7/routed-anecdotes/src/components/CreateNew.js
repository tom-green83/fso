import React from 'react'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const removeReset = (object) => {
    const objectNoReset = { ...object }
    delete objectNoReset.reset
    return objectNoReset
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input { ...removeReset(content) } />
        </div>
        <div>
          author
          <input { ...removeReset(author) } />
        </div>
        <div>
          url for more info
          <input { ...removeReset(info) } />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew