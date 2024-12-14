import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import admin from '../images/585e4beacb11b227491c3399.png';
import student from '../images/585e4beacb11b227491c3399.png';
import img from '../images/railway.jpg';

function Home() {
  return (
    <div className="home-container">
      <h1 id="header">Smart Transportation Railways</h1>
      <div className="links">
        <Link to="/signup">
          <img id="admin" src={admin} alt="Admin Logo" />
          <h2>Admin</h2> 
        </Link>
        <Link to="/signin">
          <img id="student" src={student} alt="Passenger Logo" />
          <h2>Passenger</h2>
        </Link>
      </div>
    </div>
  );
}

export default Home;
