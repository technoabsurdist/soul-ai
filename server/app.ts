import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'User-Agent']
}));

const pool = new Pool({
    user: 'username',
    host: 'localhost',
    database: 'your_database',
    password: 'password',
    port: 5432,
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
app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});

