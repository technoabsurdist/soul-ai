<p align="center">
  <img src="./frontend/public/dreams2.png" alt="Dreams AI Logo" width="300">
</p>

# Dreams AI 

Dreams AI is an intuitive platform designed to simplify and enhance your dream logging experience. Users can input dream details and benefit from automatic title, tag, and image generation, with the core feature offering profound insights into the deeper psychological implications of your dreams. Dive into your subconscious and uncover unique narratives with Dream Digital Journal.

## Features

- **Digital Dream Logging**: Streamlined process for dream documentation in a user-friendly digital format.
- **Automated Title, Tag, and Image Generation**: Effortless organization of your dream entries.
- **Deep Dream Analysis**: Identification and interpretation of patterns, entities, and recurring motifs.

## Frontend 

Built with React:

### Setup

```bash
cd path-to-your-react-app
npm install
npm start
```

## Backend 

### Database
PostgreSQL is used for data storage.

#### Database Schema:
- Users table: Contains fields such as `id`, `email`, and `password_hash`.

### Server
- Framework: [Express.js](https://expressjs.com/) (or your preferred backend framework).
- Connection: Uses `node-postgres` for efficient database operations.

### Setup

1. Install the required dependencies:
    `npm install express pg bcrypt`

2. Start your server:
    `node path-to-your-server-file.js`

3. Set up the PostgreSQL database and update connection details in the backend configuration.

4. Start the frontend and backend servers as mentioned in their respective setup sections.

## Contribution

Contributions, issues, and feature requests are welcome. Feel free to check the [Issues page](#) for any open issues or to create a new one.

## License

This project is licensed under the [MIT License](#). (Replace `#` with the link to your license file if available).
