import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
import Tickets from './components/tickets/Tickets';
import TicketItem from './components/tickets/TicketItem';
import AuthProvider from './components/auth/AuthProvider';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/employees" element={<Tickets/>} />
        <Route path="/tickets/:id" element={<TicketItem/>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;