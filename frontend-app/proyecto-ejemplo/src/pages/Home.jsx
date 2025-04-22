import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate
    const listarUsuarios = async () => {
        navigate("/detalle");
    };

    return (
        <div>
            <h1>Bienvenido a la página de inicio</h1>
            <p>Esta es la página principal de la aplicación.</p>
             <button className="btn btn-primary" onClick={() => listarUsuarios()}>
                 Click me
            </button>
        </div>    
    );
}

export default Home;