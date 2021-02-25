describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name:'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrongpasswd')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'username or password is not valid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe.only('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'First new blog created by Cypress',
        author: 'Andy Chin1',
        url: 'http://www.blog.com/2341.html1',
        likes: 1
      })
      cy.createBlog({
        title: 'Second new blog created by Cypress',
        author: 'Andy Chin2',
        url: 'http://www.blog.com/2341.html2',
        likes: 2
      })
      cy.createBlog({
        title: 'Third new blog created by Cypress',
        author: 'Andy Chin3',
        url: 'http://www.blog.com/2341.html3',
        likes: 3
      })
      cy.createBlog({
        title: 'Third new blog created by Cypress',
        author: 'Andy Chin4',
        url: 'http://www.blog.com/2341.html4',
        likes: 4
      })
    })

    // it('A blog can be created', function(){
    //   cy.createBlog({
    //     title: 'A new blog created by Cypress',
    //     author: 'Andy Chin',
    //     url: 'http://www.blog.com/2341.html'
    //   })
    // })

    it('blog can be likes', function(){
      cy.contains('Second new blog created by Cypress').contains('view').click()
      cy.contains('http://www.blog.com/2341.html2').parent().find('button').contains('like').click()
    })

    it('blog can be delete', function(){
      cy.contains('Second new blog created by Cypress').contains('view').click()
      cy.contains('http://www.blog.com/2341.html2').parent().find('button').contains('remove').click()
    })
  })
})