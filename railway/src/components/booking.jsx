import React, { useState } from 'react';
import axios from 'axios';
import './booking.css';

function BookTicketForm() {
 
    const [formData, setFormData] = useState({
        passengerName: '',
        passengerAge: '',
        trainId: '',
        routeId: '',
        sourceStationId: '',
        destinationStationId: '',
        journeyDate: '',
        seatsRequested: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (Object.values(formData).some(value => value === '')) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/booking', formData);
            setMessage(response.data.message);
            setError('');
            setFormData({
                passengerName: '',
                passengerAge: '',
                trainId: '',
                routeId: '',
                sourceStationId: '',
                destinationStationId: '',
                journeyDate: '',
                seatsRequested: ''
            });
        } catch (error) {
            console.error("Booking failed", error);
            setError("Booking failed. Please try again.");
        }
    };

    return (

        <div className='book'>
            <h2>Book a Ticket</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Passenger Name:
                    <input
                        type="text"
                        name="passengerName"
                        value={formData.passengerName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Passenger Age:
                    <input
                        type="number"
                        name="passengerAge"
                        value={formData.passengerAge}
                        onChange={handleChange}
                        required
                        min="1" 
                    />
                </label>
                <label>
                    Train ID:
                    <input
                        type="number"
                        name="trainId"
                        value={formData.trainId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Route ID:
                    <input
                        type="number"
                        name="routeId"
                        value={formData.routeId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Source Station ID:
                    <input
                        type="number"
                        name="sourceStationId"
                        value={formData.sourceStationId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Destination Station ID:
                    <input
                        type="number"
                        name="destinationStationId"
                        value={formData.destinationStationId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Journey Date:
                    <input
                        type="date"
                        name="journeyDate"
                        value={formData.journeyDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Number of Seats:
                    <input
                        type="number"
                        name="seatsRequested"
                        value={formData.seatsRequested}
                        onChange={handleChange}
                        required
                        min="1" 
                    />
                </label>
                <button type="submit">Book Ticket</button>
            </form>
        </div>
        
    );
}

export default BookTicketForm;
