const Email = require('./emailProvider/email.js')
const axios = require('axios')
const Nexmo = require('nexmo')


const sendSMS = async(fastify,sendSMSRequest)=>{
    // const { mobileNo } = await Customer.findOne({customerId:sendSMSRequest.customerId}) 
    const nexmo = new Nexmo({
        apiKey: '16e111e5',
        apiSecret: 'qzOsov6s7JvZfuVF',
      });
    
    
    const from = 'Vonage APIs';
    const to = '91'+mobileNo;
    const text = 'Your Colossal Verification code is: 1234';
      
    nexmo.message.sendSms(from, to, text);
    console.log("Done Message")

    return {
        response : "success"
    }
}

const emailProvider = async(fastify, emailRequest)=>{
    // const { email } = await Customer.findOne({customerId:emailRequest.customerId}) 
    try {
        const customer = await axios.get('http://127.0.0.1:3000/getCustomer?'+'customerId='+emailRequest.customerId)
        
    } catch (error) {
        return {
            response : "Not Found"
        }
    }
    const mail =  new Email(fastify, customer.data.data)
    console.log(mail)
    return mail.sendEmail()
}

module.exports ={
    sendSMS,
    emailProvider
}