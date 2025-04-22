import { createContext } from "react";
import { useState, useEffect } from "react";
import Login from './../Pages/Login';
const Contexto = createContext();

function UserContext({children}) {
    // const [userEmail, setUserEmail] = useState("");
    // const [userPassword, setUserPassword] = useState("");
    // const [tokenGen, setTokenGen] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
      const token = localStorage.getItem("token")
      const userData = localStorage.getItem("user")
      if(token) {
        setUser(JSON.parse(userData))
        setIsAuthenticated(true)
      }
    }, [])

    const login = (token, user) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setIsAuthenticated(true)
        setUser(user)
    }
    
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        //esto es para que los valores se pueda compartir entre los componentes
        <Contexto.Provider value={{ isAuthenticated, user, login, logout,   }}>       
            {children}
        </Contexto.Provider>
    );
}

export {Contexto};
export default UserContext;