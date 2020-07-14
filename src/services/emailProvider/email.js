const config = require('../../config/index')
const emailConfig = config.emailProviders.email

const fs = require("fs")
const hbs = require('hbs');
const nodemailer = require('nodemailer')

const smtpMailer = require(`../../helpers/smtpMailer.js`)

class Email {
    constructor(fastify, emailRequest) {
        this.fastify = fastify
        this.emailRequest = emailRequest.email
        
        const template_content = fs.readFileSync(`${__dirname}/../../templates/email/`+ `otp` + `.hbs`, 'utf8')
        this.htmlContent = template_content
    }
    sendEmail(){

        const receiver = this.emailRequest
        const fastify = this.fastify
        // console.log(receiver)
        const options = 
            {
                pool:true,
                service: emailConfig.server,
                port: 587,
                secure: true, 
                auth: {
                  user: emailConfig.username,
                  pass: emailConfig.apiKey
                },
            }
        // let transporter = nodemailer.createTransport(options);
        let message = {
            from: '"' + emailConfig.senderName + '" <' + emailConfig.senderEmail + '>',
            to: " <"+receiver+">",
            subject: "Colossal Verification",
            html: this.htmlContent,            
            // attachments:[{
            //     filename: 'heart_icon.jpg',
            //     path: __dirname +'/heart_icon.jpg',
            //     cid: 'unique@nodemailer.com' //same cid value as in the html img src
            // }],
        };

        console.log(receiver)
        return smtpMailer(fastify,options,message)

        // verify connection configuration
        // transporter.verify(function(error, success) {
        //     if (error) {
        //     console.log(error);
        //     } else {
        //     console.log("Server is ready to take our messages");
        //     }
        // });
    }
}
module.exports = Email