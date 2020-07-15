const HttpError = require('../models/errors/httpError')

exports.validateSendMailRequest = function (req, res, done) {
    if (!req.query.customerId) {
        res.code(400)
        done(new HttpError('faliure', 20001, 'customerId is missing'))
    }
    else {
        done()
    }
}

