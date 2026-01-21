import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
import Tickets from './components/tickets/Tickets';
import TicketItem from './components/tickets/TicketItem';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/employee" element={<Tickets/>} />
        <Route path="/tickets/:id" element={<TicketItem/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;