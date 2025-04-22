import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './pages/User/Context/UserContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </StrictMode>,
)
