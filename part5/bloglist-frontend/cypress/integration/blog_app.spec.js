describe('Blog app', function() {
  const testUser = {
    username: 'testuser',
    name: 'Test user',
    password: 'password'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})
