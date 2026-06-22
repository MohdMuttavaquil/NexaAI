import axios from "axios";

const authtication = async () => {
    try {
        const res = await axios.get('https://hpz7blqb44kkjzogumd642dole0lbwou.lambda-url.ap-south-1.on.aws/user/check', {
            withCredentials: true
        })
        if (res.data.success == true) {
            return res.data
            
        }
    } catch (error) {
        return(error.response.data)
         
    }

}


export { authtication }