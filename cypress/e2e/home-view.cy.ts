describe('Home View', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('finds welcome message when not signed in', () => {
    cy.contains('h2', 'Welcome')
  })
  // signing in is tested at the component level
})
