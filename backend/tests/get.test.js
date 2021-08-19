const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('GET /contacts', ()=> {

    let resp;
    let userToken;

    before(async () => {

        const user = { email: 'jose@qaninja.com.br', password: 'pwd123' }

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

    before(async () => {
        var server = await init();

        resp = await server.inject({
            method: 'get',
            url: '/contacts',
            headers: { 'Authorization': userToken}
        })
    })
    it('deve retornar 200', async ()=> {
        expect(resp.statusCode).to.equal(200)
    })

    it('deve retornar uma lista', async ()=> {
        expect(resp.result).to.be.array()
    })


})

