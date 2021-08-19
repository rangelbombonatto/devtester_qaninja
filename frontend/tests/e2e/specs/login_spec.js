

describe('Login', () => {

    const user = { email: 'fernando@qaninja.com.br', password: 'pwd123' }

    before(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/user',
            headers: { 'Content-Type': 'application/json' },
            body: user,
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    context('Quando submeto credenciais validas', () => {
        before(() => {
            cy.doLogin(user.email, user.password)
        })

        it('deve exibir o dashboard', () => {
            cy.contains('h4', 'Seu gerenciador digital de contatos')
        })

    })

    context('Quando submeto senha incorreta', () => {
        const expectMessage = 'E-mail e/ou senha incorretos!'

        before(() => {
            cy.doLogin(user.email, 'abc123')
        })

        // replace(/[^a-zA-Z ]/g)} utilizado pra remover acentuação e pontuação
        it(`deve exibir ${expectMessage.replace(/[^a-zA-Z ]/g, '')}`, () => {
            cy.loginAlert(expectMessage).should('be.visible')
        })

    })

    context('Quando não informo o e-mail', () => {
        const expectMessage = 'Oops. Por favor informe o seu email!'

        before(() => {
            cy.doLogin('', 'abc123')
        })

        it(`deve exibir ${expectMessage.replace(/[^a-zA-Z ]/g, '')}`, () => {
            cy.loginAlert('Oops. Por favor informe o seu email!').should('be.visible')
        })

    })

    context('Quando não informo a senha', () => {
        const expectMessage = 'Oops. Por favor informe a sua senha!'
        before(() => {
            cy.doLogin('fernando@qaninja.com.br', '')
        })

        it(`deve exibir ${expectMessage.replace(/[^a-zA-Z ]/g, '')}`, () => {
            cy.loginAlert('Oops. Por favor informe a sua senha!').should('be.visible')
        })

    })

})