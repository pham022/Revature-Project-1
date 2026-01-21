import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
import Tickets from './components/tickets/Ticket';
import AuthProvider from './components/auth/AuthProvider';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/employees" element={<Tickets/>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;