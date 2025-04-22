import { useState, useEffect } from "react"
import { useNavigate, useParams} from "react-router-dom"

function EditProduct() {
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const navigate = useNavigate();
    const { id } = useParams(); // <-- obtenemos el ID del producto

    // Cargar producto al montar
    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const resp = await fetch(`http://localhost:3040/api/getProduct/${id}`);
                const data = await resp.json();
                setNombre(data.nombre);
                setCategoria(data.categoria);
                setPrecio(data.precio);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            }
        };
        obtenerProducto();
    }, [id]);

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3040/api/editProduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, categoria, precio }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Producto editado:", data);
                navigate("/pro");
            } else {
                console.error("Error al editar el producto");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al editar el producto");
        }
    };

    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleEditSubmit} className="container mt-5 p-4 border rounded shadow" style={{ maxWidth: "400px" }}>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="nombre"
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                    className="form-control mb-3"
                />

                <label htmlFor="category">Categoria:</label>
                <input
                    type="text"
                    id="category"
                    name="categoria"
                    onChange={(e) => setCategoria(e.target.value)}
                    value={categoria}
                    className="form-control mb-3"
                />

                <label htmlFor="price">Precio:</label>
                <input
                    type="text"
                    id="price"
                    name="precio"
                    onChange={(e) => setPrecio(e.target.value)}
                    value={precio}
                    className="form-control mb-3"
                />

                <button type="submit" className="btn btn-primary w-100">Guardar</button>
            </form>
        </div>
    );
}

export default EditProduct;