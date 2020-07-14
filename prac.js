const axios = require('axios')

const abc = async(res)=>{
    try {
        const customer = await axios.get('http://127.0.0.1:3000/getCustomer?'+'customerId='+res)
        if(!customer.data.data){
            console.log("Error")
        }
        return customer
    } catch (e) {
        console.log("Error")
    }
}
const a = abc('Customer_200')