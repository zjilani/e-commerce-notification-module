const fs = require("fs")
const hbs = require('hbs');

class SMSProvider {
    constructor(fastify, smsRequest) {
        this.fastify = fastify
        this.smsRequest = smsRequest

        this.fastify.log.info("SMSProvider")

        const template_content = fs.readFileSync(`${__dirname}/../../templates/sms/`
            + `otp` + `.hbs`, 'utf8')

 
        this.msg = template_content
        
        fastify.log.debug(this.msg)
    }

    getHttpHeaders() {
        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return headers;
    }
}

module.exports = SMSProvider