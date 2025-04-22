import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Contexto } from '../Context/UserContext';

function Register() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    // const { login } = useContext(Contexto);

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post("http://localhost:3040/api/registerUser", { email: userEmail, password: userPassword, name: userName });
            console.log(resp.data);
            navigate("/list");
            // const token = resp.data.token;
            // const user = resp.data.user;
            // if (token) {
            //     login(token, user);
            //     alert("Registro Exitoso");
            // } else {
            //     alert("Error token no generado");
            // }
        } catch (error) {
            alert("Error al registrar usuario");
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <label htmlFor=""> Nombre de Usuario </label>
                <input type="text" placeholder="Nombre de Usuario" onChange={(e) => setUserName(e.target.value)} required />
                <label htmlFor=""> Correo Electronico  </label>
                <input type="email" placeholder="Correo" onChange={(e) => setUserEmail(e.target.value)} required />
                <label htmlFor=""> Contraseña </label>
                <input type="password" onChange={(e) => setUserPassword(e.target.value)} required placeholder="Password" />
                <button type="submit">Registrar</button>
            </form>
        </div>

    )
}

export default Register;
