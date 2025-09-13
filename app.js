const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const port = 8080;

const corsOptions = {
    origin: 'http://localhost:4200', // Angular frontend
    optionsSuccessStatus: 200
};

// PostgreSQL connection
const pool = new Pool({
    user: 'sridharrajen',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

async function createAlbumsTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email NUMERIC(100)
        );
      `;

        await pool.query(query);
        console.log('User table created');
    } catch (err) {
        console.error(err);
        console.error('User table creation failed');
    }
}

createAlbumsTable();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// API endpoint
app.get('/api/users', async (req, res) => {
    try {
        const query = 'SELECT * FROM users;';
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('failed');
    }
});


app.post('/api/submit', async (req, res) => {
    const { name, phone, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users(name, phone, email) VALUES($1, $2, $3) RETURNING *',
            [name, phone, email]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log('Server running on http://localhost:8080');
});