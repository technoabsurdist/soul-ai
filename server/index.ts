import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import session from 'express-session';
import * as helpers from './helpers';

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
  origin: 'https://soul-ai.vercel.app',
  credentials: true,
  allowedHeaders: ['Content-Type', 'User-Agent']
}));
app.use(session({
  secret: process.env.SECRET_KEY || "",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
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

  const result = await pool.query('SELECT id, password_hash FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (validPassword) {
    console.log("user.id", user.id)
    req.session.userId = user.id;
    req.session.save((err) => {
      if(err) {
        console.error("Session save error:", err);
      }
    });
    return res.send('Logged in successfully!');
  }

  return res.status(400).send('Invalid email or password.');
});


app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const result = await pool.query('INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *', [email, password_hash]);
  res.send(result.rows[0]); 
});

app.post('/entry', async (req, res) => {
  const { text } = req.body;
  const title = await helpers.generateTitle(text); 
  const userId = req.session.userId; 
  const result = await pool.query('INSERT INTO documents (text, title, user_id) VALUES ($1, $2, $3) RETURNING *', [text, title, userId]);
  res.send(result.rows[0]);
}); 

app.get('/entry', async (req, res) => {
  const userId = req.session.userId; 
  if (!userId) {
    console.log("Unathorized")
    return res.status(401).send('Unauthorized');
  }  
  try {
    const result = await pool.query('SELECT * FROM documents WHERE user_id = $1', [userId]);
    return res.send(result.rows);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).send('An error occurred while fetching documents.');
  }
});

app.get('/user', async (req, res) => {
  const userId = req.session.userId; 
  if (!userId) return res.status(401).send('Unauthorized');
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    console.log("user", result.rows[0])
    return res.send(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).send('An error occurred while fetching user.');
  }
}); 

app.post('/chat', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).send('Unauthorized');

  const { text } = req.body;

  const journalResults = await pool.query('SELECT text FROM documents WHERE user_id = $1', [userId]);
  const journalText = journalResults.rows.map((entry) => {
    return entry.text
  }); 
  const name = await pool.query(`SELECT name FROM users WHERE id = $1`, [userId])
  console.log("name", name.rows[0].name)

  const response = await helpers.modelResponse(name.rows[0].name, text, journalText);
  console.log("response", response)

  try {
    const result = await pool.query(
      'INSERT INTO chats (user_input, model_response, user_id) VALUES ($1, $2, $3) RETURNING *',
      [text, response, userId]
    );
    console.log("result", result.rows[0])
    res.send(result.rows[0]);
  } catch (error) {
    console.error('Error inserting chat:', error);
    return res.status(500).send('An error occurred while inserting chat.');
  }

});

app.get('/chat/history', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).send('Unauthorized');

  const result = await pool.query('SELECT * FROM chats WHERE user_id = $1 ORDER BY timestamp ASC', [userId]);
  const formattedHistory = result.rows.map(row => [
    { type: 'user', text: row.user_input },
    { type: 'model', text: row.model_response },
  ]).flat();
  return res.json(formattedHistory);
});


app.get('/test-db', async (_req, res) => {
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

