
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashbord';
import Home from './components/home';
import Signup from './components/signup';
import SearchRoute from './components/searchroute';
import Passenger from './components/passengerlogin';
import PassengerSign from './components/passengersignup';
import Booking from './components/booking'
import Payment from './components/totalprice'
import Trigger from './components/trigger'
import Stations from './components/crud'
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/adminlogin' element={<Login />} />
        <Route path='/home' element={<Home />} /> {/* Use '/' instead of an empty string */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/searchRoute' element={<SearchRoute/>}/>
        <Route path='/passengerlogin' element={<Passenger/>}/>
        <Route path='/signin' element={<PassengerSign/>}/>
        <Route path='/booking' element={<Booking />} />
        <Route path='/route-stats' element={<Payment />} />
        <Route path='/booking-log' element={<Trigger/>} />
        <Route path='/routes' element={<Stations/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

  
