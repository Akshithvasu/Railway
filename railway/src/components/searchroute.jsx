import React, { useState } from 'react';
import axios from 'axios';


function SearchRoute() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!source || !destination) {
      setError('Please enter both source and destination');
      return;
    }

    try {
      const res = await axios.get('http://localhost:8081/searchroute', {
        params: { source, destination }
      });
      setRoutes(res.data);
    } catch (err) {
      console.error("Error fetching routes:", err);
      setError('Could not fetch routes. Try again later.');
    }
  };

  return (
    <div className="route-search">
      <h2>Search Train Routes</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Source Station:</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Enter source station"
          />
        </div>
        <div>
          <label>Destination Station:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination station"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="route-results">
        {routes.length > 0 ? (
          <ul>
            {routes.map((route) => (
              <li key={route.route_id}>
                <strong>Route ID:</strong> {route.route_id} - <strong>{route.route_name}</strong>: {route.source} to {route.destination} ({route.distance_km} km) - Price: ${route.price}
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>No routes found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchRoute;
