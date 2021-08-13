'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

const mongoURl = "mongodb+srv://qaninja:qaninja@cluster0.cjvhr.mongodb.net/zaplinkdb?retryWrites=true&w=majority";

mongoose.connect(mongoURl,  { useNewUrlParser: true,  useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected')
})

mongoose.connection.on('error', (error) => {
    console.log('MongoDB Error ' + error)
})

if(process.env.NODE_ENV === 'test') {
    mongoose.connection.dropDatabase()
}

const contactRoutes = require('./routes/contact.routes')

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: {
            // origin: ['http://localhost:8080']
            origin: ['*'] // libera acesso para qualquer aplicação
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return { message: 'Welcome to Zaplink API', company: 'QA Ninja', course: 'DevTeser' };
    }
});

server.route(contactRoutes)

server.start((err)=> {
    if (err) {
        throw err;
    }
    console.log('Server running on %s', server.info.uri);
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

exports.init = async ()=> {
    return server;
}