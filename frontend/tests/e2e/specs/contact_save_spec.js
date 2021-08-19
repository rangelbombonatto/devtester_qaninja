// class DashPage {

//     PADRÃO PAGE OBJECTS CONVENCIONAL
//     fullName() {
//         return cy.get('.input-name input')
//     }

//     saveContact() {
//         return cy.get('#saveButton').click()
//     }

//     PADRÃO CUSTOM ACTIONS
//     create(contact) {
//         cy.get('#addNewContact').click()

//         cy.get('.input-name input').type(contact.name)
//         cy.get('.input-number input').type(contact.number)
//         cy.get('.text-description textarea').type(contact.description)

//         cy.get('#saveButton').click()
//         
//     }
//     // const dash = new DashPage      
// }

describe('Cadastro de contatos', () => {

    const user = { email: 'joao@yahoo.com', password: 'pwd123' }

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


    describe('Novo Contato', () => {
        let contact = {
            name: 'Fernando Papito',
            number: '1199999999',
            description: 'Solicitar orçamento para consultoria QA e DevOps.'
        }

        // não é possível usar os códigos do cypress dentro do describe
        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Então deve cadastrar esse contato', () => {
                cy.contactList().contains(contact.name)
            })
        })

        describe('Quando submeto o cadastro sem o nome', () => {

            const expectNotice = 'Nome é obrigatório.'
            
            let contact = {
                number: '1199999999',
                description: 'Solicitar orçamento para consultoria QA e DevOps.'
            }

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Então deve mostrar ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertName().contains(expectNotice)
            })
        })

        describe('Quando submeto o cadastro sem o whatsapp', () => {
            const expectNotice = 'WhatsApp é obrigatório.'
            
            let contact = {
                name: 'Fernando Papito',
                number: '',
                description: 'Solicitar orçamento para consultoria QA e DevOps.'
            }
            
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            
            it(`Então deve mostrar ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertNumber().contains(expectNotice)
            })
        })

        describe('Quando submeto o cadastro sem o assunto', () => {
            const expectNotice = 'Assunto é obrigatório.'

            let contact = {
                name: 'Fernando Papito',
                number: '1199999999'
            }
            
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it(`Então deve mostrar ${expectNotice.replace(/[^a-zA-Z ]/g, '')}`, () => {
                cy.alertDesc().contains(expectNotice)
            })
        })
    })
})