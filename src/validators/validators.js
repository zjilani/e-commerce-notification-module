const HttpError = require('../models/errors/httpError')

exports.validateCreateCustomerRequest = function (req, res, done) {
    if (!req.body.userName) {
        res.code(400)
        done(new HttpError('faliure', 20001, 'userName is missing'))
    }else if (!req.body.mobileNo) {
        res.code(400)
        done(new HttpError('faliure', 20001, 'mobileNo is missing'))
    }else if (!req.body.email) {
        res.code(400)
        done(new HttpError('faliure', 20001, 'email is missing'))
    }else if (!req.body.password) {
        res.code(400)
        done(new HttpError('faliure', 20001, 'password is missing'))
    }
    else {
        done()
    }
}

