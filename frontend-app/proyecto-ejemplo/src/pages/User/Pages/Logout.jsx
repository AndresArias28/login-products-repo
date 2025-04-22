import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate()

    const handleLogout = () => {

        // localStorage.removeItem("token")
        navigate("/")
    }
    

    return (
       <button onClick={handleLogout}>Cerrar Sesión</button>
    )
}

export default Logout;