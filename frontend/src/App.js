import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './component/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './component/PrivateRoute';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';
import FooterIcons from './component/GithubIcon';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
        <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<Tickets />} />
            </Route>
            <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
              <Route path='/ticket/:ticketId' element={<Ticket />} />
            </Route>
          </Routes>
        </div>
        <ToastContainer />
        <FooterIcons />
      </Router>
    </>
  );
}

export default App;
