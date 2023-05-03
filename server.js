//Setup/import express/routes and connection to MongoDB
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set port and initiate instance of Express app
const PORT = 3001;
const app = express();

// Setup middleware to handle incoming data from the url
app.use(express.urlencoded({ extended: true }));
// Middleware to handle incoming data in JSON format (parser)
app.use(express.json());
app.use(routes);

// Listen for database connection to open, then start the server and log successful
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
