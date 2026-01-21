import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
import AuthProvider from './components/auth/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;