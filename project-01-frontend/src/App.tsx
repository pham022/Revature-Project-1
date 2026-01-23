import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/auth/Login';
import Tickets from './components/tickets/Tickets';
import TicketItem from './components/tickets/TicketItem';
import TicketDetail from './components/tickets/TicketDetail';
import NewTicket from './components/tickets/NewTicket';
import AuthProvider from './components/auth/AuthProvider';
import Register from './components/auth/Register';
import ManagerDashboard from './components/ManagerDashboard';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/employee" element={<Tickets/>} />
        <Route path="/manager" element={<ManagerDashboard/>} />
        <Route path="/tickets/new" element={<NewTicket/>} />
        <Route path="/tickets/:id" element={<TicketDetail/>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;