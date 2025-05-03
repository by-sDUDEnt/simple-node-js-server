const express = require('express');
const app = express();

require("dotenv").config();

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 3000;


const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
	user: 'postgres',
	password: '123456',
	host: 'postgres',
	port: '5432',
	database: 'host',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});


app.get('/', (req, res) => {
    res.send('Hello, World!!!');
});
app.get('/users', async (req, res) => {
	try {
	  const result = await client.query('SELECT * FROM users ORDER BY id');
	  res.json(result.rows);
	} catch (err) {
	  console.error('Error fetching users:', err.message);
	  res.status(500).send('Server error');
	}
  });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

