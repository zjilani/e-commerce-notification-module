// const accountSid = 'AC0aab93dc8115aebc2d1ed3c0c559a455';
// const authToken = '3d45d42f48ff42b197f86ffc7d667772';

// const client = require('twilio')(accountSid, authToken);

// client.messages.create({
//     to: '+918083335945',
//     from: '+12136993804',
//     body: 'This is trial'
// })
// .then((message)=> console.log(message)).catch((e)=>console.log(e))
const axios = require('axios')
const abc = async(res)=>{
    try {
        const otp='1234'
        console.log(res)
        const customer = await axios.post("http://localhost:3000/updateCustomer?customerId="+res,{otp:otp})
        console.log(customer)
    } catch (error) {
        
        // console.log(error)
    }
}
abc('Customer_2')
