
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/User/Pages/Login'
import Home from './pages/Home'
import './App.css'
import Register from './pages/User/Pages/Register'
import ListUsers from './pages/User/Pages/listUSers'
import Logout from './pages/User/Pages/logout'
import Product from './pages/Product/Pages/Product'
import AddPrdoduct from './pages/Product/Pages/AddProduct'
import EditProduct from './pages/Product/Pages/EditProduct'

function App() {

  return (
    <Router>
      <Routes>
        <Route>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<ListUsers />} />
        {/* <Route path="/detalle" element={<Detalle />} /> */}
        <Route path='/registro' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/pro" element={ <Product /> } />
        <Route path="/addProducts" element={ <AddPrdoduct /> } />
        <Route path="/edit/:id" element={ <EditProduct /> } />

        {/* <Route path="/detalle/:id" element={<h1>Detalle</h1>} /> */}
        {/* <Route path="/detalle/:id" element={<Detalle />} /> */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
