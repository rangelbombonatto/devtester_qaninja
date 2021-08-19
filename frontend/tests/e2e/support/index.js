// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


// desabilitar screenshot
Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
})

// screenshot para cada caso de testes
afterEach(() => {
    cy.screenshot()
})

const addContext = require('mochawesome/addContext')

// intercepta o código no final de cada execução
Cypress.on('test:after:run', (test) => {
    
    const shotFileName = `${test.title} -- after each hook.png`
    addContext({test}, `assets/screenshots/${Cypress.spec.name}/${shotFileName}`)
})