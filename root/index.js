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

const routers = require('./routers');

function useRouters (routers) {
    routers.forEach(router => {
        app.use(router.path, router.router);
    });
}

useRouters(routers);

function fetchRoutes (routers) {
    var Table = require('cli-table');
    var table = new Table({ head: ["", "Path"] });

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
            fetchRoutes([...routers, {router: app._router, path: "/"}]);
        });

    } catch (err) {
        console.log(err);
    }
};

startServer();