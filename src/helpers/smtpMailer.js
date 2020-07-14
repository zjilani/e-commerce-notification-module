const nodemailer = require('nodemailer')
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

module.exports = function (fastify, smtpConfig, mailData) {
    fastify.log.debug('nodemailer')

    let transporter = nodemailer.createTransport(smtpConfig)
    fastify.log.debug(transporter.options.host)
   
    return transporter.sendMail(mailData)
}