import React, { useState } from 'react';

function UpdateBooking() {
    const [bookingId, setBookingId] = useState('');
    const [newSeats, setNewSeats] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/booking-log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId, newSeats }),
            });

            if (response.ok) {
                setMessage('Booking updated successfully!');
                setBookingId('');
                setNewSeats('');
            } else {
                const error = await response.json();
                setMessage(`Error: ${error.message}`);
            }
        } catch (err) {
            setMessage('Error updating booking.');
        }
    };

    return (
        <div>
            <h2>Update Booking</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Booking ID:
                    <input
                        type="text"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    New Number of Seats:
                    <input
                        type="number"
                        value={newSeats}
                        onChange={(e) => setNewSeats(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Update Booking</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdateBooking;
