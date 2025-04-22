import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Contexto } from "../Context/UserContext.jsx";
import axios from "axios";

function Login() {
    const {  login  } = useContext(Contexto)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("");
    const Navigate = useNavigate()
    const URL = "http://localhost:3040/api/loginUser"

    const handlerSubmit =  async(e) => {
        e.preventDefault()
        setErrorLogin("");
        try{
            const resp = await axios.post(URL, {email, password})
            console.log(resp.data);
            const token = resp.data.token
            const user = resp.data.user
            console.log("el nomnbre es",user.name);
            if(token){
                login(token, user)
                alert("Logeo Exitoso")
                Navigate("/pro")
            }else{
                alert("Usuario o contraseña incorrectos")
                setErrorLogin("Usuario o contraseña incorrectos");
            }
        }catch(error){
            console.log(error)
            if (error.response && error.response.status === 401) {
                setErrorLogin(error.response.data.message || "Correo o contraseña incorrectos");
            } else {
                setErrorLogin("Error, usuario no encontrado");
            }
        } 
    }


    return (
        <form onSubmit={handlerSubmit} className="container mt-5 p-4 border rounded shadow" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        {errorLogin && (
        <div className="alert alert-danger text-center" role="alert">
            {errorLogin}
        </div>
        )}

        <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input 
                type="email" 
                className="form-control" 
                placeholder="Ingrese su correo"
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
        </div>
    
        <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
                type="password" 
                className="form-control" 
                placeholder="Ingrese su contraseña"
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
        </div>
    
        <button type="submit" className="btn btn-primary w-100">
            Login
        </button>
    </form>
    
    )
}

export default Login;
