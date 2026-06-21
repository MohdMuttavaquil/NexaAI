import axios from "axios";

const authtication = async () => {
    try {
        const res = await axios.get('http://localhost:3000/user/check', {
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