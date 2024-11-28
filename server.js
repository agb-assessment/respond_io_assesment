const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the routes for users and notes
const userRoutes = require('./routes/userRoutes.js');
const noteRoutes = require('./routes/noteRoutes.js');

const app = express();

var corOptions = {
    origin: 'https://localhost:8081',
};

app.use(cors(corOptions));
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello from API' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
