import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
import Tickets from './components/tickets/Tickets';
import TicketItem from './components/tickets/TicketItem';
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
<<<<<<< HEAD
        <Route path="/employees" element={<Tickets/>}/>
        <Route path="/register" element={<Register/>}/>
=======
        <Route path="/register" element={<Register/>}/>
        <Route path="/employee" element={<Tickets/>} />
        <Route path="/tickets/:id" element={<TicketItem/>} />
>>>>>>> 4a990233a13fee2a2c0594e3abcfee2dc58805ad
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;