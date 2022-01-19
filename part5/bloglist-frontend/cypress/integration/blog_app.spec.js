describe('Blog app', function() {
  const blogCreator = {
    username: 'blogcreator',
    name: 'Blog Creator',
    password: 'blogcreator'
  }

  const nonCreator = {
    username: 'noncreator',
    name: 'Non Creator',
    password: 'noncreator'
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
    cy.request('POST', 'http://localhost:3003/api/users/', nonCreator)
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

    it('A blog can be liked', function() {
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

    it.only('A blog can be deleted by its creator', function() {
      // Add blog to delete
      cy.contains('create new blog').click()
      cy.get('#title').type(blogToAdd.title)
      cy.get('#author').type(blogToAdd.author)
      cy.get('#url').type(blogToAdd.url)
      cy.get('#submitBlogButton').click()

      // Reload the page to get option to remove blog
      cy.visit('http://localhost:3000')

      // Delete the blog
      cy.contains(`${blogToAdd.title}`).get('button').contains('show').click()
      cy.get('.blog').contains(`${blogToAdd.title}`).get('button').contains('remove').click()
      cy.contains((`${blogToAdd.title}`)).should('not.exist')
    })

    it.only('A blog can not  be deleted by a user who did not create it', function() {
      // Add blog to delete
      cy.contains('create new blog').click()
      cy.get('#title').type(blogToAdd.title)
      cy.get('#author').type(blogToAdd.author)
      cy.get('#url').type(blogToAdd.url)
      cy.get('#submitBlogButton').click()

      // Logout as creator and login as another user
      cy.contains('logout').click()
      cy.login({ username: `${nonCreator.username}`, password: `${nonCreator.password}` })
      //Reload page to try loading option to remove blog
      cy.visit('http://localhost:3000')

      // Try to find button to remove blog
      cy.contains(`${blogToAdd.title}`).get('button').contains('show').click()
      cy.get('.blog').contains(`${blogToAdd.title}`).get('button').contains('remove').should('not.be.visible')
    })

  })
})
