import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import session from 'express-session';

declare module 'express-session' {
  interface Session {
    userId: number;
  }
}

const app = express();
dotenv.config(); 

// middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'User-Agent']
}));
app.use(session({
  secret: process.env.SECRET_KEY || "",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // TODO: change when using HTTPS 
}));

// database
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME
});

// routes
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query('SELECT password_hash FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (validPassword) {
      req.session.userId = user.id;
      return res.send('Logged in successfully!');
    }
  
    return res.status(400).send('Invalid email or password.');
});

app.post('/entry', async (req, res) => {
  const { text, title } = req.body;
  console.log("text", text)
  console.log("title", title)
  console.log("userId", req.session.userId)
  const userId = req.session.userId;
  const result = await pool.query('INSERT INTO documents (text, title, user_id) VALUES ($1, $2, $3) RETURNING *', [text, title, userId]);
  res.send(result.rows[0]);
}); 

app.get('/entry', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).send('Unauthorized');
  try {
    const result = await pool.query('SELECT * FROM documents WHERE user_id = $1', [userId]);
    return res.send(result.rows);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).send('An error occurred while fetching documents.');
  }
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

