import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('blog component', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author',
    url: 'example.com',
    user: { username: 'username' },
    likes: 10
  }

  const user = {
    username:'username'
  }

  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}/>
    )
  })

  test('renders blog title and author by default', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library')
    expect(component.container).toHaveTextContent(
      'author')
  })

  test('does not render url and likes by default', () => {
    const div  = component.container.querySelector('togglableBlogDetails')
    expect(div).toBe(null)
  })

})