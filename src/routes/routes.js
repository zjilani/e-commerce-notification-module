const controllers = require('../controllers/controller')
const validators = require('../validators/validators')

// Import Swagger documentation
const documentation = require('./documentation/documentServicesApis')

const routes = [
    {
        method: "POST",
        url: "/sendSMS",
        handler: controllers.sendSMS,
        schema: documentation.sendSMS,
        // preValidation: validators.validateSendSMSRequest
    },
    {
        method: "POST",
        url: "/sendMail",
        handler: controllers.sendMail,
        schema: documentation.sendMail,
        preValidation: validators.validateSendMailRequest
    }
]


module.exports = routes