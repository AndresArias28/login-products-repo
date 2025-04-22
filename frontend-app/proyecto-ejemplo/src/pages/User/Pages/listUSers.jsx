import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../../../Components/NavBar/Navbar"

function ListUsers() {
    const [token, setToken] = useState(null)
    const [users, setUsers] = useState([])
    // const {setUserEmail, setUserPassword, setTokenGen} = useContext(Contexto)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        setToken(storedToken)
        if (storedToken) {
            listarUsarios(storedToken)
        }else{
            alert("No tienes permisos para ver esta pagina")
        }
    }, []);

    const listarUsarios = async (storedToken) => {
        try {
            const response = await axios.get("http://localhost:3040/api/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setToken(storedToken)
            setUsers(response.data)
            console.log(response.data);
        } catch (error) {
            console.log("error al obtener usuarios", error)
        }
    }

    return (
        <div>
            <Navbar />
            {token ? (
                <div>
                    <h1>Lista de Usuarios</h1>
                    <button>Cerrar Sesión</button>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>pass</th>
                                <th>Correo Electronico</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.password}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (<p>No autorizado</p>)}
        </div>
    )
}

export default ListUsers