describe('Blog app', function() {
  const blogCreator = {
    username: 'blogcreator',
    name: 'Blog Creator',
    password: 'blogcreator'
  }

  const blogToAdd = {
    title: 'Using Cypress to test blog app',
    author: 'author',
    url: 'example.com'
  }

  const blogToLike = {
    title: 'Like this blog',
    author: 'author',
    url: 'example.com'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', blogCreator)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(blogCreator.username)
      cy.get('#password').type(blogCreator.password)
      cy.get('#login-button').click()
      cy.contains(`${blogCreator.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(blogCreator.username)
      cy.get('#login-button').click()
      cy.get('.error').contains('invalid credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: `${blogCreator.username}`, password: `${blogCreator.password}` })
    })

    it('A blog can be created', function() {
      cy.contains(`${blogCreator.name} logged in`)
      cy.contains('create new blog').click()
      cy.get('#title').type(blogToAdd.title)
      cy.get('#author').type(blogToAdd.author)
      cy.get('#url').type(blogToAdd.url)
      cy.get('#submitBlogButton').click()
      cy.get('.blog').contains(`${blogToAdd.title} ${blogToAdd.author}`)
    })

    it.only('A blog can be liked', function() {
      // Add blog to like
      cy.contains('create new blog').click()
      cy.get('#title').type(blogToLike.title)
      cy.get('#author').type(blogToLike.author)
      cy.get('#url').type(blogToLike.url)
      cy.get('#submitBlogButton').click()

      // Like the blog
      cy.contains(`${blogToLike.title}`).get('button').contains('show').click()
      cy.get('.blog').contains(`${blogToLike.title}`).get('button').contains('like').click()
      cy.get('.blog').contains(`${blogToLike.title}`).contains('likes 1')
    })
  })
})
