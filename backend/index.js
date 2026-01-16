require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db.js'); // Corrected Path

// Import Routes
const authRoutes = require('./src/routes/authRoutes.js'); // Corrected Path
const userRoutes = require('./src/routes/userRoutes.js'); // Corrected Path
const storeRoutes = require('./src/routes/storeRoutes.js'); // Corrected Path
// We will create the ratingRoutes later
// const ratingRoutes = require('./src/routes/ratingRoutes'); 

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to enable Cross-Origin Resource Sharing
app.use(cors());

//Testing the basic route:
app.get('/', (req, res) =>{
    res.json({message: "Welcome to the Store Rating API!"});
});
// --- API Routes ---
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to the Store Rating API!" });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
// app.use('/api/ratings', ratingRoutes);

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
