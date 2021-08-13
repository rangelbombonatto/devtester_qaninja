// https://docs.cypress.io/api/introduction/api.html

describe('Dashboard', () => {

  describe('Quando acesso o dashboard', ()=> {

    before(()=> {
      cy.visit('/dashboard')
      cy.contains('h4', 'Seu gerenciador digital de contatos')  
    })

    it('Então devo ver a lista de contatos', ()=> {
      // cy.get('.card').should('have.length',3)  // have.length é um metodo do javascript que conta o número de posições dentro de uma string pode ser utilizado quando sempre retornar posição fixa
      cy.get('.card', { timeout: 5000 }).then((elements) => {
          expect(elements.length > 0).to.be.true // testando a lista independente dos contatos cadastrados
      })
    })

  })
})
