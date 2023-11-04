// importing modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const authenticateUserMiddleware = require('./middlewares/authenticate');
const { validateSchemaMiddleware } = require('./middlewares/validateBodyData');

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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authenticating routes
app.use('/api', authenticateUserMiddleware);
app.use('/api', validateSchemaMiddleware)

const routers = require('./routers');
var generatedRoutes = []

function createRouters (router) {
    const Router = express.Router();

    router.router.forEach(route => {
        Router[route.method](route.path, [...route.middleware], route.controller);
    })

    return Router;
}

function useRouters (routers) {
    routers.forEach(router => {
        const Router = createRouters(router);
        generatedRoutes.push({path: router.path, router: Router});
        app.use(router.path, Router);
    });
}

function fetchRoutes (routers) {
    var Table = require('cli-table');
    var table = new Table({ head: ["METHOD", "PATH"] });

    for (var index in routers) {
        const path = routers[index].path;
        const stack = routers[index].router.stack;
        for (var key in stack) {
            if (stack.hasOwnProperty(key)) {
                var val = stack[key];
                if(val.route) {
                    val = val.route;
                    var _o = {};
                    _o[val.stack[0].method]  = [path + val.path];    
                    table.push(_o);
                }       
            }
        }
    }

    console.log(table.toString());
    return table;
};

useRouters(routers);

const startServer = async () => {
    try {
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
            fetchRoutes(generatedRoutes);
        });

    } catch (err) {
        console.log(err);
    }
};

try {
    startServer();
} catch (err) {
    console.log('Error starting server');
    console.log(err);
}