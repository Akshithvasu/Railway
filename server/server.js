import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME
} from './config.js';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
  multipleStatements: true
});


app.post('/signup', (req, res) => {
  const sql = "INSERT INTO account (`name`, `lastname`, `email`, `password`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.lastname,
    req.body.email,
    req.body.password
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json('Error');
    }
    return res.json(data);
  });
});


app.post('/adminlogin', (req, res) => {
  const sql = "SELECT * FROM account WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json('Error');
    }
    
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});
app.post('/signin', (req, res) => {
  const sql = "INSERT INTO account (`name`, `lastname`, `email`, `password`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.lastname,
    req.body.email,
    req.body.password
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json('Error');
    }
    return res.json(data);
  });
});

app.post('/passengerlogin', (req, res) => {
  const sql = "SELECT * FROM account WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json('Error');
    }
    
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});
app.get('/searchroute', (req, res) => {
  const { source, destination } = req.query;

  const sql = `
    SELECT r.route_id, r.route_name, s1.station_name AS source, s2.station_name AS destination, r.distance_km, r.price 
    FROM routes r
    JOIN stations s1 ON r.source_station_id = s1.station_id
    JOIN stations s2 ON r.destination_station_id = s2.station_id
    WHERE s1.station_name = ? AND s2.station_name = ?
  `;

  db.query(sql, [source, destination], (error, results) => {
    if (error) {
      console.error("Database query error:", error); 
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } else {
      res.json(results);
    }
  });
});


app.post('/booking', (req, res) => {
  const {
      passengerName,
      passengerAge,
      trainId,
      routeId,
      sourceStationId,
      destinationStationId,
      journeyDate,
      seatsRequested
  } = req.body;

  console.log('Received booking request:', req.body); 

  const query = `CALL bookTicket(?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
      query,
      [passengerName, passengerAge, trainId, routeId, sourceStationId, destinationStationId, journeyDate, seatsRequested],
      (error, results) => {
          if (error) {
              console.error('Error executing query:', error);
              return res.status(500).json({ error: 'Booking failed. Please try again.' });
          }
   
          const message = results[0][0]?.message || 'Ticket booked successfully';
          res.json({ message });
      }
  );
});




app.get('/route-stats', (req, res) => {
  const sql = `
      SELECT 
          r.route_id, 
          r.route_name,
          SUM(b.No_of_seats) AS total_seats_booked,
          SUM(b.No_of_seats * r.Price) AS total_revenue
      FROM 
          Bookings b
      JOIN 
          Routes r ON b.route_id = r.route_id
      GROUP BY 
          r.route_id;
  `;

  db.query(sql, (error, results) => {
      if (error) {
          console.error("Error fetching route stats:", error);
          res.status(500).json({ error: 'Database error' });
      } else {
          res.json(results);
      }
  });
});

app.post('/booking-log', (req, res) => {
  const { bookingId, newSeats } = req.body;

  const sql = `UPDATE Bookings SET No_of_seats = ? WHERE booking_id = ?`;
  db.query(sql, [newSeats, bookingId], (err, result) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      
      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Booking not found' });
      }
      
      res.json({ message: 'Booking updated successfully' });
  });
});

app.post('/routes', (req, res) => {
  const { route_name, source_station_id, destination_station_id, price, distance_km } = req.body;
  const query = 'INSERT INTO routes (route_name, source_station_id, destination_station_id, price, distance_km) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [route_name, source_station_id, destination_station_id, price, distance_km], (err, result) => {
      if (err) {
          console.error('Error inserting route:', err);
          return res.status(500).send(err);
      }
      res.status(201).json({ message: 'Route added successfully', routeId: result.insertId });
  });
});

// Read: Get all routes
app.get('/routes', (req, res) => {
  const query = 'SELECT * FROM routes';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching routes:', err);
          return res.status(500).send(err);
      }
      res.json(results);
  });
});

// Update: Modify a route
app.put('/routes/:id', (req, res) => {
  const { id } = req.params;
  const { route_name, source_station_id, destination_station_id, price, distance_km } = req.body;
  const query = 'UPDATE routes SET route_name = ?, source_station_id = ?, destination_station_id = ?, price = ?, distance_km = ? WHERE route_id = ?';
  db.query(query, [route_name, source_station_id, destination_station_id, price, distance_km, id], (err) => {
      if (err) {
          console.error('Error updating route:', err);
          return res.status(500).send(err);
      }
      res.json({ message: 'Route updated successfully' });
  });
});

// Delete: Remove a route
app.delete('/routes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM routes WHERE route_id = ?';
  db.query(query, [id], (err) => {
      if (err) {
          console.error('Error deleting route:', err);
          return res.status(500).send(err);
      }
      res.json({ message: 'Route deleted successfully' });
  });
});


app.listen(PORT, () => {
  console.log('Server on port', PORT);
});
