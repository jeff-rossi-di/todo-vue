import { apiBaseUrl } from '../../src/constants'

describe('Random View', () => {
  beforeEach(() => {
    cy.intercept('GET', `${apiBaseUrl}/user`, { fixture: 'users.json' }).as('load-users')
    cy.intercept('POST', `${apiBaseUrl}/auth/login`, { fixture: 'login.json' }).as('sign-in')
    cy.intercept('GET',`${apiBaseUrl}/todo`, { fixture: 'todos.json'}).as('load-todos')
    cy.visit('/random')
  })
  it('should sign in as a random user', () => {
    cy.contains('h2','Random Sign In')
    cy.wait('@load-users')
    cy.get('[data-cy=user-select]').click()
    cy.contains('Ashton1').click()
    cy.get('[data-cy=sign-in-button]').click()
    cy.contains('Ashton1')
  })
})
