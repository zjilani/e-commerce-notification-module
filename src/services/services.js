const Email = require('./emailProvider/email.js')
const Twilio = require('./smsProvider/twilio.js')
const Notify = require('./notification/notify.js')
const axios = require('axios')


const smsProvider = async(fastify,smsRequest)=>{
    try {
        const customer = await axios.get('https://jilani-e-commerce-customer.herokuapp.com/getCustomer?'+'customerId='+smsRequest.customerId)
        // console.log(customer)
        const sms = new Twilio(fastify, customer.data.data);
        return sms.sendSMS();
        // console.log(sms)
        
    } catch (error) {
        return {
            response : "Not Found"
        }
    }
    
}

const emailProvider = async(fastify, emailRequest)=>{
    try {
        const customer = await axios.get('https://jilani-e-commerce-customer.herokuapp.com/getCustomer?'+'customerId='+emailRequest.customerId)
        const generateOTP=() =>{ 
 
            var digits = '0123456789'; 
            let OTP = ''; 
            for (let i = 0; i < 4; i++ ) { 
                OTP += digits[Math.floor(Math.random() * 10)]; 
            } 
            return OTP; 
        }
        const otp = generateOTP()
        const customerId = customer.data.data.customerId
        const updatedCustomer = await axios.post("https://jilani-e-commerce-customer.herokuapp.com/updateCustomer?customerId="+customerId,{otp:otp})
        
        const mail =  new Email(fastify, customer.data.data,otp)
        
        return mail.sendEmail()
        
    } catch (error) {
        // console.log(error)
        return {
            response : "Not Found"
        }
    }
    
}
const notifyCustomer = async(fastify,notifyRequest)=>{
    try {
        const customer = await axios.get('https://jilani-e-commerce-customer.herokuapp.com/getCustomer?'+'customerId='+notifyRequest.customerId)
        
        const notify = new Notify(fastify, customer.data.data,notifyRequest);

        return notify.sendNotification();
    
        
    } catch (error) {
        console.log(error)
        return {
            response : "Not Found"
        }
    }
    
}

module.exports ={
    smsProvider,
    emailProvider,
    notifyCustomer
}

