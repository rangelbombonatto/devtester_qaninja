describe('Conversar', () => {

    const user = { email: 'roberto@yahoo.com', password: 'pwd123' }

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

        cy.doLogin(user.email, user.password)
        cy.get('.dashboard', {timeout: 5000}).should('be.visible')
    })

    const contact = {
        name: 'Jojo Todinho',
        number: '2190022002',
        description: 'Entrar em contato para agendar show de funk'
    }

    context(`Dado que ${contact.name} é um bom contato `, () => {

        before(() => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/contacts',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('user_token')
                },
                body: contact,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Quando acesso o dashboard', () => {
            cy.dash()
        })

        it('Devo ver a propriedade href com o link do whatsapp', () => {
            const externalLink = `https://api.whatsapp.com/send?phone=55${contact.number}`
            cy.get(`a[href$="${contact.number}"]`).should('have.attr', 'href', externalLink)
        })

    })
})