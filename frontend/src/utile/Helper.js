import axios from "axios";

//const url = 'https://w5p5lfzxsqgwlwqvl7innu6nka0txdkr.lambda-url.ap-south-1.on.aws/user/check'
const url = 'http://localhost:3000/user/check'

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


const formateChat = (chat) =>{

    let a = []
    if (chat.length > 5) {
        for(let i=chat.length-1; i>=chat.length-5; i--){
        a.unshift(chat[i])
    }
    } else {
        a = chat
    }
    
    const formatedChat = a.map((i) =>{
        return i.type == 'q' ? {role: 'user', parts: [{ text: i.message} ] }
       : {role: 'model', parts: [{ text: i.message} ] }
    })

    return formatedChat
}

export { authtication, formateChat }