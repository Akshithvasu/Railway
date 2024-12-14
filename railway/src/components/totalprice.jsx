import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './totalprice.css'

function RouteStats() {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8081/route-stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching route stats:", error);
                setError('Failed to load route statistics. Please try again later.');
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="route-stats">
            <h2>Route Statistics</h2>
            {error && <p className="error">{error}</p>}
            {stats.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Route ID</th>
                            <th>Route Name</th>
                            <th>Total Seats Booked</th>
                            <th>Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map(stat => (
                            <tr key={stat.route_id}>
                                <td>{stat.route_id}</td>
                                <td>{stat.route_name}</td>
                                <td>{stat.total_seats_booked}</td>
                                <td>${stat.total_revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <p>No route statistics available.</p>
            )}
        </div>
    );
}

export default RouteStats;
