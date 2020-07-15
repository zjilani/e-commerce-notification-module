const axios = require("axios")
const querystring = require('querystring')
const config = require('./../../config/index')
const twilioConfig = config.smsProviders.twilio

// const SMSProvider = require("./sms.js")

class Twilio {
    constructor(fastify, smsRequest) {
        this.fastify = fastify
        this.smsRequest = smsRequest

        this.fastify.log.info("SMSProvider")

        const template_content = fs.readFileSync(`${__dirname}/../../templates/sms/`
            + `otp` + `.hbs`, 'utf8')

 
        this.msg = template_content
        
        fastify.log.debug(this.msg)
    }

    sendSMS() {
        this.fastify.log.info("Twilio")

        const receiver = this.smsRequest
        const fastify = this.fastify
        console.log(this.smsRequest)

        var from = null;
        var mode = twilioConfig.mode
        // if (mode == 'AlphaSender') {
        //     from = twilioConfig.senderName
        // } else {
            from = twilioConfig.fromNumber
        // }
    
        var params = null;
        // if (this.smsRequest.validity) {
        //     params = {
        //         Body: "Colossal Verification code: 1234",
        //         From: String(from),
        //         To: "+" + String(this.smsRequest.mobileNo),
        //         // validity: this.smsRequest.validity
        //     }
        // }
        // else {
        //     params = {
        //         Body: String(this.msg),
        //         From: String(from),
        //         To: "+" + String(this.smsRequest.recipientNo)
        //     }
        // }
        params = {
            Body: "Colossal Verification code: 1234",
            From: String(from),
            To: "+91" + String(receiver.mobileNo),
            // validity: this.smsRequest.validity
        }
        this.fastify.log.info(params)

        const url = twilioConfig.baseURL
            + `/${twilioConfig.apiVersion}/Accounts/${twilioConfig.accountSID}`
            + twilioConfig.endpoint
        this.fastify.log.info(url)

        return this.fastify.axios.post(url, querystring.stringify(params), this.getHttpHeaders())
    }

    getHttpHeaders() {
        var headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${Buffer.from(twilioConfig.accountSID + ':' + twilioConfig.authToken).toString('base64')}`
            }
        }

        return headers;
    }
}

module.exports = Twilio