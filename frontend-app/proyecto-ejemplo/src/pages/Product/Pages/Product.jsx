import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Navbar from "../../../Components/NavBar/Navbar"
import { useNavigate } from "react-router-dom"


function Product() {
    const [producto, setProducto] = useState([])
    const [token, setToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {

        const storedToken = localStorage.getItem("token")
        setToken(storedToken)
        if (storedToken) {
            lisProducts(storedToken)
        } else {
            alert("No tienes permisos para ver esta pagina")
        }
    }, []);

    const lisProducts = async (storedToken) => {
        try {

            const response = await axios.get("http://localhost:3040/api/getAllProducts", {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });

            setToken(storedToken)
            setProducto(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const addProduct = () => {
        try {
            navigate("/addProducts");
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProducts = async (id) => {
        console.log("Productos:", producto);

        if (!window.confirm('¿Estas seguro de que deseas eliminar este Producto?')) return;
        try {
            const response = await axios.delete(`http://localhost:3040/api/deleteProduct/${id}`);
            
            if (response.status !== 200) {
                throw new Error('Error al eliminar el producto');
            }
        
            lisProducts(token); // refresca la lista
        } catch (error) {
            console.error('Error al eliminar el producto:', error.response?.data || error.message);
        }
        
    }

    return (
        <div>
            <Navbar />
            {token ? (
                <div>
                    <h1>Lista de productos</h1>
                    <button className="btn btn-primary" onClick={addProduct}>Agregar productos</button>
              
                    <table className="table  table-bordered mt-4">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>precio</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   

                            producto.map((prod) => (
                            
                                <tr key={prod.id}>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.categoria}</td>
                                    <td>{prod.precio}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => navigate(`/edit/${prod.id}`)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => deleteProducts(prod.id)}>Eliminar</button>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>
            ) : (<p>No autorizado</p>)}
        </div>
    )
}

export default Product