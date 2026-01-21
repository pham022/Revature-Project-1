import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
import Tickets from './components/tickets/Ticket';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/employees" element={<Tickets/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;