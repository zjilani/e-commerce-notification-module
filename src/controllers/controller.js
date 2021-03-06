const services = require('../services/services')
const HttpError = require('../models/errors/httpError')

// Create a new folder in Documer Service
exports.sendSMS = async (req, res) => {
    try {
        let response = await services.smsProvider(req.fastify, req.query)
        if(response.response  === "Not Found"){
            console.log(response)
            res.code(400)
            throw new HttpError('failure', 22005, "Check CustomerId")
        }
        // console.log(response)

        return res.status(201).send({
            status: 'success',
            data: response
        })
    } catch (e) {
        res.code(500)
        console.log(e)
        throw new HttpError('failiure', 10102, "Message sending failed", e.message)
    }
}
exports.sendMail = async (req, res) => {
    try {
        let response = await services.emailProvider(req.fastify, req.query)
        if(response.response  === "Not Found"){
            // console.log(response)
            res.code(400)
            throw new HttpError('failure', 22005, "Check CustomerId")
        }
        return res.status(201).send({
            status: 'success',
            data: response
        })
    } catch (e) {
        res.code(500)
        throw new HttpError('failiure', 2001, "Mail sending failed", e.message)
    }
}
exports.notifyCustomer = async (req, res) => {
    try {
        let response = await services.notifyCustomer(req.fastify, req.body)
        if(response.response  === "Not Found"){
            // console.log(response)
            res.code(400)
            throw new HttpError('failure', 22005, "Check Request Body")
        }
        return res.status(201).send({
            status: 'success',
            message: 'Notify Mail Sent...'
        })
    } catch (e) {
        res.code(500)
        throw new HttpError('failiure', 2002, "Notify Mail failed", e.message)
    }
}





