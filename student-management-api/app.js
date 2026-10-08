// Student Management REST API - Lab Assignment 2 (Web Dev III, Unit 2)
// Author: Naman Joshi
const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(logger);         // custom logger (method, URL, time)
app.use(express.json()); // parse JSON request bodies

// ---------- Routes ----------
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Student Management REST API', author: 'Naman Joshi', endpoint: '/students' });
});
app.use('/students', studentRoutes);

// ---------- Error handling ----------
// 404 - unknown route
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Central error handler (4 arguments)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' }); // 400 Bad Request
  }
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' }); // 500 Server Error
});

// Start the server only when run directly (so tests can import app)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
