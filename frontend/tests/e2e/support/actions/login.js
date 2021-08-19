Cypress.Commands.add("doLogin", (email, password) => {
    cy.visit('/')
    if (email)    cy.get('input[name=email]').type(email)
    if (password) cy.get('input[name=password]').type(password)
    cy.get('#sigIn').click()
})

Cypress.Commands.add("loginAlert", (target) => {
    return cy.contains('.message-body', target)
})

// como boa prática não é interessante fazer as validações nessa camada.