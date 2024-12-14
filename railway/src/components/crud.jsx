import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './crud.css'
const RoutesApp = () => {
    const [routes, setRoutes] = useState([]);
    const [routeName, setRouteName] = useState('');
    const [sourceStationId, setSourceStationId] = useState('');
    const [destinationStationId, setDestinationStationId] = useState('');
    const [price, setPrice] = useState('');
    const [distanceKm, setDistanceKm] = useState('');
    const [editId, setEditId] = useState(null);

    // Fetch routes
    const fetchRoutes = async () => {
        const response = await axios.get('http://localhost:8081/routes');
        setRoutes(response.data);
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    // Add or update route
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { route_name: routeName, source_station_id: sourceStationId, destination_station_id: destinationStationId, price, distance_km: distanceKm };
        if (editId) {
            await axios.put(`http://localhost:8081/routes/${editId}`, data);
            setEditId(null);
        } else {
            await axios.post('http://localhost:8081/routes', data);
        }
        setRouteName('');
        setSourceStationId('');
        setDestinationStationId('');
        setPrice('');
        setDistanceKm('');
        fetchRoutes();
    };

    // Delete route
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8081/routes/${id}`);
        fetchRoutes();
    };

    // Edit route
    const handleEdit = (route) => {
        setRouteName(route.route_name);
        setSourceStationId(route.source_station_id);
        setDestinationStationId(route.destination_station_id);
        setPrice(route.price);
        setDistanceKm(route.distance_km);
        setEditId(route.route_id);
    };

    return (
        <div>
            <h1>Routes Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Route Name"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Source Station ID"
                    value={sourceStationId}
                    onChange={(e) => setSourceStationId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Destination Station ID"
                    value={destinationStationId}
                    onChange={(e) => setDestinationStationId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Distance (km)"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(e.target.value)}
                />
                <button type="submit">{editId ? 'Update' : 'Add'} Route</button>
            </form>

            <ul>
                {routes.map((route) => (
                    <li key={route.route_id}>
                        <strong>{route.route_name}</strong>: Source ({route.source_station_id}) → Destination ({route.destination_station_id}), Price: ₹{route.price}, Distance: {route.distance_km} km
                        <button onClick={() => handleEdit(route)}>Edit</button>
                        <button onClick={() => handleDelete(route.route_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoutesApp;
