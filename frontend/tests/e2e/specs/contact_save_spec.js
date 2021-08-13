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
            
            let contact = {
                number: '1199999999',
                description: 'Solicitar orçamento para consultoria QA e DevOps.'
            }

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Então deve mostrar uma notificação', () => {
                cy.alertName().contains('Nome é obrigatório.')
            })
        })

        describe('Quando submeto o cadastro sem o whatsapp', () => {
            
            let contact = {
                name: 'Fernando Papito',
                number: '',
                description: 'Solicitar orçamento para consultoria QA e DevOps.'
            }
            
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Então deve mostrar uma notificação', () => {
                cy.alertNumber().contains('WhatsApp é obrigatório.')
            })
        })

        describe('Quando submeto o cadastro sem o assunto', () => {
            let contact = {
                name: 'Fernando Papito',
                number: '1199999999'
            }
            
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Então deve mostrar uma notificação', () => {
                cy.alertDesc().contains('Assunto é obrigatório.')
            })
        })
    })
})