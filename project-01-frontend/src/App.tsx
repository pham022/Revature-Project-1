<<<<<<< HEAD
import React from 'react';
import logo from './logo.svg';
=======
>>>>>>> d4af8a141527fb8e338c953018639ba839afe1c0
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
<<<<<<< HEAD
=======
import Tickets from './components/tickets/Ticket';
>>>>>>> d4af8a141527fb8e338c953018639ba839afe1c0

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    
=======
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/employees" element={<Tickets/>} />
      </Routes>
>>>>>>> d4af8a141527fb8e338c953018639ba839afe1c0
    </BrowserRouter>
  );
}

export default App;