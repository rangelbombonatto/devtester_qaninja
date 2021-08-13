const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('DELETE /contacts', () => {

    describe('Dado que eu tenho um contato indesejado', () => {

        let contact = {
            name: 'Joaquim Xavier',
            number: '11999999999',
            description: 'Corretor de imóveis'
        }

        let server;
        let resp;
        let contactId;

        before(async () => {
            server = await init()

            resp = await server.inject({
                method: 'POST',
                url: '/contacts',
                payload: contact
            })

            contactId = resp.result._id
        })

        it('Quando eu apago esse contato', async () => {
            resp = await server.inject({
                method: 'DELETE',
                url: '/contacts/' + contactId
            })

        })

        it('Então deve retornar 204', () => {
            expect(resp.statusCode).to.equal(204)

        })
    })
})