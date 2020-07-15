const Email = require('./emailProvider/email.js')
const Twilio = require('./smsProvider/twilio.js')
const axios = require('axios')
const Nexmo = require('nexmo')


const smsProvider = async(fastify,smsRequest)=>{
    try {
        const customer = await axios.get('http://127.0.0.1:3000/getCustomer?'+'customerId='+smsRequest.customerId)
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
        const customer = await axios.get('http://127.0.0.1:3000/getCustomer?'+'customerId='+emailRequest.customerId)
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
        const updatedCustomer = await axios.post("http://localhost:3000/updateCustomer?customerId="+customerId,{otp:otp})
        
        const mail =  new Email(fastify, customer.data.data,otp)
        
        return mail.sendEmail()
        
    } catch (error) {
        // console.log(error)
        return {
            response : "Not Found"
        }
    }
    
}

const otpVerification = async(fastify,otpRequest)=>{
    try {
        const customer = await axios.get('http://127.0.0.1:3000/getCustomer?'+'customerId='+otpRequest.customerId)
        const otpVerified = true
        
        if(customer.data.data.otp === otpRequest.otp){
           const updateCustomer= await axios.post("http://localhost:3000/updateCustomer?customerId="+otpRequest.customerId,{otpVerified:otpVerified})
        //    console.log(updateCustomer.data.data)
        }
        return { response:"Done verification"}
        
    } catch (error) {
        return {
            response : "Not Found"
        }
    }
    
}



module.exports ={
    smsProvider,
    emailProvider,
    otpVerification
}

