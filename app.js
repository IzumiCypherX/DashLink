const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./models');
const authRouter = require('./routes/auth');
const linkRouter = require('./routes/generateLink');
const authenticate = require('./middleware/authenticate');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/media/qr', express.static('controllers/public'));

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Sync database
db.sequelize.sync();

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Hey There Human, this is DashLink.'
    });
});

app.use('/', authRouter);
app.use('/', linkRouter);

// Authentication middleware
app.use(authenticate);

// 404 Error handler for unmatched routes
app.use((req, res, next) => {
    res.status(404);
    res.json({
        error: 'File not found',
        message: 'The requested file does not exist.',
    });
});

// Generic error handler for other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong!',
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
