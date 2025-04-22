import { useContext } from 'react';
import { Contexto } from '../../pages/User/Context/UserContext';

function Navbar() {
  const { user } = useContext(Contexto)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="/">Mi App</a>
      {/* mensak de bienvenida */}
      {user ? (
        <div className="text-white">Bienvenido: {user.name}</div>
      ) : (
        <div className="text-white">Cargando usuario...</div>
      )}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/home">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/registro">Registro</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pro">Productos</a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-danger" href="/logout">Salir</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar