// https://docs.cypress.io/api/introduction/api.html

describe('root test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('a', 'SR')
    cy.contains('button', 'Add New')
  })
})
