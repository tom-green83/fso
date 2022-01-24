import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type){
  case 'ADD_BLOG':
    state = state.concat(action.blog)
    return state
  case 'SET_BLOGS':
    state = action.blogs
    return state
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch (setBlogs(blogs))
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog: blog
  }
}

export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    blogs: blogs.sort((a, b) => b.likes - a.likes)
  }
}

export default blogReducer