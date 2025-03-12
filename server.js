const express = require('express');
const db = require('./public/db/dbconfig.js');
const userRoutes = require('./public/routes/users.js');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});