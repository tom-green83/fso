import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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
      `${blog.title}`)
    expect(component.container).toHaveTextContent(
      `${blog.author}`)
  })

  test('does not render url and likes by default', () => {
    const div  = component.container.querySelector('togglableBlogDetails')
    expect(div).toBe(null)
  })

  test('renders url and likes after clicking', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
      `${blog.url}`)
    expect(component.container).toHaveTextContent(
      `likes ${blog.likes}`)
  })

})