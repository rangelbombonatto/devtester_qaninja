const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('DELETE /contacts', () => {

    let resp;
    let userToken;
    
    before(async () => {

        const user = { email: 'joao@qaninja.com.br', password: 'pwd123' }

        var server = await init();

        await server.inject({
            method: 'post',
            url: '/user',
            payload: user
        })

        resp = await server.inject({
            method: 'post',
            url: '/session',
            payload: user
        })

        userToken = resp.result.user_token

    })

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
                payload: contact,
                headers: { 'Authorization': userToken}
            })

            contactId = resp.result._id
        })

        it('Quando eu apago esse contato', async () => {
            resp = await server.inject({
                method: 'DELETE',
                url: '/contacts/' + contactId,
                headers: { 'Authorization': userToken}
            })

        })

        it('Então deve retornar 204', () => {
            expect(resp.statusCode).to.equal(204)

        })
    })

    describe('Dado que não tenho acesso', () => {

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
                payload: contact,
                headers: { 'Authorization': userToken}
            })

            contactId = resp.result._id
        })

        it('Quando eu tento apagar esse contato', async () => {
            resp = await server.inject({
                method: 'DELETE',
                url: '/contacts/' + contactId,
                headers: { 'Authorization': '6117cecfea30a23f28feabcd'}
            })

        })

        it('Então deve retornar 401', () => {
            expect(resp.statusCode).to.equal(401)

        })
    })
})