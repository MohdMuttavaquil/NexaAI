import { createContext, useState } from "react";
export const AppContext = createContext()
import { authtication } from "../utile/Helper";

export const AppProvider = ({ children }) =>{
  
   const [titleId, setTitleId] = useState()
   const [userInfo, setUserInfo] = useState()
   const [chat, setChat] = useState([])
   const url = 'https://hpz7blqb44kkjzogumd642dole0lbwou.lambda-url.ap-south-1.on.aws'
  // const url = 'http://localhost:3000'


  return(
    <AppContext.Provider value={{ titleId, setTitleId, userInfo, setUserInfo, chat, url, setChat}} >
      {children}
    </AppContext.Provider>
  )
}