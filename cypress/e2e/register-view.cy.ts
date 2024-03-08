import { apiBaseUrl } from '../../src/constants'

describe('Register View', () => {
  const credentials: { [key: string]: string } = {
    UserName: 'CypressTestUser',
    PassWord: 'S3cr37!!',
    Email: 'cypress.test@example.com'
  }
  beforeEach(() => {
    cy.intercept('POST', `${apiBaseUrl}/auth/register`, { fixture: 'register.json' }).as('register')
    cy.visit('/register')
  })
  it('should register a user', () => {
    cy.contains('h2', 'Register')
    cy.get('[data-cy=user-name-input]').type(credentials.UserName)
    cy.get('[data-cy=pass-word-input]').type(credentials.PassWord)
    cy.get('[data-cy=email-input]').type(credentials.Email)
    cy.get('[data-cy=register-button]').click()
    cy.contains('h2', 'Sign In')
  })
})
