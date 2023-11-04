// importing modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const authenticateUserMiddleware = require('./middlewares/authenticate');

// configuring dotenv
require('dotenv').config();

// creating express object
const app = express();

// configuring morgan
if (process.env.NODE_ENV === 'development') {
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    app.use(morgan('dev', { stream: accessLogStream }));
} else {
    app.use(morgan('combined'));
}

// using body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// authenticating routes
app.use('/api', authenticateUserMiddleware);

// importing routes
const schemaCRUDRoutes = require('./routes/schemaCRUD');

// using routes
app.use('/api/schema', schemaCRUDRoutes);

const startServer = async () => {
    try {
        console.log('Connecting to database');
        console.log(process.env.MONGODB_URI);
        // connecting to database
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
        
        // listening to port 
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Listening to port ${port}`);
        });

    } catch (err) {
        console.log(err);
    }
};

startServer();