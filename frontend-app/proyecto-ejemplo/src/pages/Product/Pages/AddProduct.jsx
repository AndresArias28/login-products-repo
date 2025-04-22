import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPrdoduct() {
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const navigate = useNavigate();
    const [token, setToken] = useState(null)


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            alert("No tienes permisos para ver esta página");
            // navigate("/l"); // opcional redirección
        }
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        // const storedToken = localStorage.getItem("token");
        // console.log("Token:", storedToken);
        try {
            // setToken(storedToken);

            const response = await axios.post("http://localhost:3040/api/addProduct", {
                nombre,
                categoria,
                precio
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (token) {
                alert("Producto agregado exitosamente");
                navigate("/pro");
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert("Error al agregar el producto");
        }
    };

    return (
        <div>
            {token ? (
                <form className="container mt-5 p-4 border rounded shadow" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
                <h1>Add Product</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Categoria</label>
                    <input type="text" className="form-control" id="description" onChange={(e) => setCategoria(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input type="number" className="form-control" id="price" onChange={(e) => setPrecio(e.target.value)} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Agregar producto</button>
                </div>
            </form>
            ) : (
                <h1>No tienes permisos para ver esta pagina</h1>
            )}
        </div>
    )
}

export default AddPrdoduct;