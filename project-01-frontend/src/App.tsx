<<<<<<< HEAD
import React from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
=======
>>>>>>> d4af8a141527fb8e338c953018639ba839afe1c0
=======
>>>>>>> test
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import Tickets from './components/tickets/Ticket';
>>>>>>> d4af8a141527fb8e338c953018639ba839afe1c0
=======
import AuthProvider from './components/auth/AuthProvider';
>>>>>>> test

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
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
=======
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </AuthProvider>
>>>>>>> test
    </BrowserRouter>
  );
}

export default App;