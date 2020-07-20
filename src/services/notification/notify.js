const config = require('../../config/index')
const emailConfig = config.emailProviders.email

const fs = require("fs")
const Handlebars = require("handlebars");
const nodemailer = require('nodemailer')

const smtpMailer = require(`../../helpers/smtpMailer.js`)

class Notify {
    constructor(fastify, customer,notifyRequest) {
        this.fastify = fastify
        this.customer = customer
        this.notifyRequest = notifyRequest
        
        var template_content = fs.readFileSync(`${__dirname}/../../templates/notify/`+ this.notifyRequest.template + `.handlebars`, 'utf8')
        
        var template = Handlebars.compile(template_content)
        
        
        if(this.notifyRequest.template === 'welcome'){
            var data = { "name": this.customer.userName}
            this.htmlContent = template(data)
        }else if(this.notifyRequest.template === 'bill'){
            var data = []
            for(let i=0 ; i< this.notifyRequest.productName.length ; i++){
                data.push({ "productName" : this.notifyRequest.productName[i] , "quantity" : this.notifyRequest.quantity[i]})
            }
            var Data = { data , "amount" : this.notifyRequest.amount}
            this.htmlContent = template(Data)
            
        }
        
    }
    sendNotification(){
        const notify = this.notifyRequest
        const receiver = this.customer
        const fastify = this.fastify
        
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
            from: "COLOSSAL <" + emailConfig.senderEmail + ">",
            to: receiver.userName+ " <"+receiver.email+">",
            subject: notify.subject,
            html: this.htmlContent,            
            // attachments:[{
            //     filename: 'heart_icon.jpg',
            //     path: __dirname +'/heart_icon.jpg',
            //     cid: 'unique@nodemailer.com' //same cid value as in the html img src
            // }],
        };

        // console.log(receiver)
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
module.exports = Notify