import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dotenv from 'dotenv';

const app = express();
dotenv.config(); 

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'User-Agent']
}));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query('SELECT password_hash FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    res.send('Logged in successfully!');
});

app.get('/test-db', async (req, res) => {
  try {
      const response = await pool.query('SELECT NOW() as now');
      res.send(`Database connected at ${response.rows[0].now}`);
  } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).send('Failed to connect to the database.');
  }
});

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});

