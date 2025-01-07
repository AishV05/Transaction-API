const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
// const seedData = require('./seed');
const PORT = process.env.port;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// seedData();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));