import { createContext, useState } from "react";
export const AppContext = createContext()
import { authtication } from "../utile/Helper";

export const AppProvider = ({ children }) =>{
  
   const [titleId, setTitleId] = useState()
   const [userInfo, setUserInfo] = useState()
   const [chat, setChat] = useState([])

  return(
    <AppContext.Provider value={{ titleId, setTitleId, userInfo, setUserInfo, chat, setChat}} >
      {children}
    </AppContext.Provider>
  )
}