Cypress.Commands.add("dash", () => {
    cy.visit('/dashboard')
})

Cypress.Commands.add("createContact", (contact) => {
    cy.get('#addNewContact').click()

    if (contact.name) cy.get('.input-name input').type(contact.name)
    if (contact.number) cy.get('.input-number input').type(contact.number)
    if (contact.description) cy.get('.text-description textarea').type(contact.description)

    cy.get('#saveButton').click()
})

Cypress.Commands.add("searchContact", (number) => {
    cy.get('.level-right input').type(number)
    cy.get('.level-right button.is-primary').click()
})

Cypress.Commands.add("contactList", () => {
    return cy.get('.contact-list')
})

Cypress.Commands.add("contactItem", () => {
    return cy.get('.card')
})

Cypress.Commands.add("getContact", (target) => {
    return cy.contains('.card', target)
})

Cypress.Commands.add("removeContact", (target) => {
    cy.getContact(target).find('.btn-remove').click()
})

Cypress.Commands.add("alertName", () => {
    return cy.get('.input-name small')
})

Cypress.Commands.add("alertNumber", () => {
    return cy.get('.input-number small')
})

Cypress.Commands.add("alertDesc", () => {
    return cy.get('.text-description small')
})

