const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
require('dotenv').config();

const OPENAI_KEY = process.env.OPENAI_KEY;
const SD_KEY = process.env.SD_KEY;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'User-Agent']
}));

app.post('/generate_image', async (req, res) => {
  const { prompt } = req.body;
  const response = await generateImage(prompt);
  const imageURL = response.data.data[0].url;
  res.json({ image_url: imageURL });
});

app.post('/edit_image', async (req, res) => {
  const { prompt, original_image_url } = req.body;
  try {
    const response = await editImage(prompt, original_image_url);
    res.json({ new_image_url: response.data.url });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});



async function generateImage(prompt) {
  const url = 'https://api.openai.com/v1/images/generations';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_KEY}`,
  };
  const data = {
    model: 'image-alpha-001',
    prompt,
    num_images: 1,
    size: '256x256',
    response_format: 'url',
  };
  return axios.post(url, data, { headers });
}

async function editImage(prompt, original_image_url) {
  const url = "https://api.openai.com/v1/images/edits"
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_KEY}`,
  };
  const data = {
    image: original_image_url,
    prompt,
    size: "512x512",
    response_format: "url"
  }
  return axios.post(url, data, { headers });
}

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});

