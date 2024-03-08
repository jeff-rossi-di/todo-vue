import { apiBaseUrl } from '../../src/constants'

describe('Login View', () => {
  const credentials: { [key: string]: string } = {
    UserName: 'CypressTest',
    PassWord: 'S3cr37!!'
  }
  beforeEach(() => {
    cy.intercept('POST', `${apiBaseUrl}/auth/login`, { fixture: 'login.json' }).as('sign-in')
    cy.intercept('GET', `${apiBaseUrl}/todo`, { fixture: 'todos.json' }).as('load-todos')
    cy.visit('/login')
  })
  it('should sign in a user', () => {
    cy.get('[data-cy=user-name-input]').type(credentials.UserName)
    cy.get('[data-cy=pass-word-input]').type(credentials.PassWord)
    cy.get('[data-cy=sign-in-button]').click()
    cy.contains(credentials.UserName)
  })
})
