const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('POST /contacts', () => {

    let resp;
    let userToken;

    before(async () => {

        const user = { email: 'fernando@qaninja.com.br', password: 'pwd123' }

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

        describe('quando não tenho acesso', () => {
            before(async () => {
                var server = await init();

                resp = await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: null,
                    headers: { 'Authorization': '6117cecfea30a23f28feabcd' }
                })
            })
            it('deve retornar 401', async () => {
                expect(resp.statusCode).to.equal(401)
            })

        }),

        describe('quando o payload é nulo', () => {
            before(async () => {
                var server = await init();

                resp = await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: null,
                    headers: { 'Authorization': userToken }
                })
            })
            it('deve retornar 400', async () => {
                expect(resp.statusCode).to.equal(400)
            })

        }),

        describe('quando o payload é bonitão', () => {
            before(async () => {
                var server = await init();

                let contact = {
                    name: "Fernando 2",
                    number: "11999999999",
                    description: "Lorem Ipsu Test"
                }

                resp = await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: contact,
                    headers: { 'Authorization': userToken }
                })
            })
            it('deve retornar 200', async () => {
                expect(resp.statusCode).to.equal(200)
            })

            it('deve retornar o id do contato', async () => {
                // console.log(resp.result._id)
                expect(resp.result._id).to.be.a.object()
                expect(resp.result._id.toString().length).to.equal(24)
            })
        }),

        describe('quando o contato já existe', () => {
            before(async () => {
                var server = await init();

                let contact = {
                    name: "Fernando Duplicado",
                    number: "11777777777",
                    description: "Lorem Ipsu Test"
                }

                await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: contact,
                    headers: { 'Authorization': userToken }
                })

                resp = await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: contact,
                    headers: { 'Authorization': userToken }
                })
            })
            it('deve retornar 409', async () => {
                expect(resp.statusCode).to.equal(409)
            })

        }),

        describe('quando o payload não tem o nome', () => {
            before(async () => {
                var server = await init();

                let contact = {
                    number: "11999999999",
                    description: "Lorem Ipsu Test"
                }

                resp = await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: contact,
                    headers: { 'Authorization': userToken }
                })
            })
            it('deve retornar 409', async () => {
                expect(resp.statusCode).to.equal(409)
            }),

                it('deve retornar uma mensagem', async () => {
                    expect(resp.result.message).to.equal('Name is required.')
                })
        }),

        describe('quando o campo nome está em branco', () => {
            before(async () => {
                var server = await init();

                let contact = {
                    name: "",
                    number: "11999999999",
                    description: "Lorem Ipsu Test"
                }

                resp = await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: contact,
                    headers: { 'Authorization': userToken }
                })
            })
            it('deve retornar 409', async () => {
                expect(resp.statusCode).to.equal(409)
            }),

                it('deve retornar uma mensagem', async () => {
                    expect(resp.result.message).to.equal('Name is required.')
                })

        })

    describe('quando o payload não tem o whatsapp', () => {
        before(async () => {
            var server = await init();

            let contact = {
                name: "Fernando",
                description: "Lorem Ipsu Test"
            }

            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            })
        })
        it('deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        }),

            it('deve retornar uma mensagem', async () => {
                expect(resp.result.message).to.equal('Number is required.')
            })
    }),

        describe('quando o campo whatsapp está em branco', () => {
            before(async () => {
                var server = await init();

                let contact = {
                    name: "Fernando",
                    number: "",
                    description: "Lorem Ipsu Test"
                }

                resp = await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: contact,
                    headers: { 'Authorization': userToken }
                })
            })
            it('deve retornar 409', async () => {
                expect(resp.statusCode).to.equal(409)
            }),

                it('deve retornar uma mensagem', async () => {
                    expect(resp.result.message).to.equal('Number is required.')
                })
        })

    describe('quando o payload não tem o assunto', () => {
        before(async () => {
            var server = await init();

            let contact = {
                name: "Fernando",
                number: "11999999999"
            }

            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact,
                headers: { 'Authorization': userToken }
            })
        })
        it('deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        }),

            it('deve retornar uma mensagem', async () => {
                expect(resp.result.message).to.equal('Description is required.')
            })
    }),

        describe('quando o campo assunto está em branco', () => {
            before(async () => {
                var server = await init();

                let contact = {
                    name: "Fernando",
                    number: "11999999999",
                    description: ""
                }

                resp = await server.inject({
                    method: 'post',
                    url: '/contacts',
                    payload: contact,
                    headers: { 'Authorization': userToken }
                })
            })
            it('deve retornar 409', async () => {
                expect(resp.statusCode).to.equal(409)
            }),
                it('deve retornar uma mensagem', async () => {
                    expect(resp.result.message).to.equal('Description is required.')
                })
        })
})

