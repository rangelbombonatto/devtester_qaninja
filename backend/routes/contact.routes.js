const ContactController = require('../controllers/contact.controller')


module.exports = [
    {
        method: 'GET',
        path: '/contacts',
        handler: ContactController.list
    },
    {
        method: 'POST',
        path: '/contacts',
        handler: ContactController.create
    },
    {
        method: 'DELETE',
        path: '/contacts/{contactId}',
        handler: ContactController.remove
    }
]

