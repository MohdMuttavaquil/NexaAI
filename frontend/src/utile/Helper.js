import axios from "axios";

const url = 'https://w5p5lfzxsqgwlwqvl7innu6nka0txdkr.lambda-url.ap-south-1.on.aws/user/check'
//const url = 'http://localhost:3000/user/chack'

const authtication = async () => {
    try {
        const res = await axios.get(url, {
            withCredentials: true
        })
        if (res.data.success == true) {
            return res.data

        }
    } catch (error) {
        return (error.response.data)

    }

}


export { authtication }