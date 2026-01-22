import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
import Tickets from './components/tickets/Ticket';
import AuthProvider from './components/auth/AuthProvider';
import Register from './components/auth/Register';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/employees" element={<Tickets/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;