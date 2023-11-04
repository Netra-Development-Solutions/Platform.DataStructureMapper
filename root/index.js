const startTimestamp = new Date().getTime();
// importing modules
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const authenticateUserMiddleware = require('./middlewares/authenticate');
const { validateSchemaMiddleware } = require('./middlewares/validateBodyData');
const JSONschemaCore = require('./models/JSONschemaCore');

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

var generatedRouters = []
var generatedSchema = {}
var generatedRoutes = {}


// using body-parser middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authenticating routes
app.use('/api', authenticateUserMiddleware);
app.use('/api', validateSchemaMiddleware(generatedSchema, generatedRoutes))

const routers = require('./routers');

async function createRoutes (route, Router) {
    const schemaKey = route.inputSchema.key;
    const version = route.inputSchema.version;
    const schemaIdentifier = `${schemaKey}_${version}`;

    const schemaResponse = await JSONschemaCore.findOne({ key: schemaKey, version: version });

    if (!generatedSchema[schemaIdentifier]) {
        generatedSchema[schemaIdentifier] = schemaResponse.schema;
    }
    
    if (!schemaResponse) {
        throw new Error('Schema not found');
    }

    if (!generatedRoutes[route.path]) {
        generatedRoutes[route.path] = route;
    }

    Router[route.method](route.path, [...route.middleware], route.controller);
}

async function createRouters (router) {
    const Router = express.Router();

    for (var index in router.router) {
        await createRoutes(router.router[index], Router);
    }

    return Router;
}

async function useRouters (routers) {
    for (var index in routers) {
        const Router = await createRouters(routers[index]);
        generatedRouters.push({path: routers[index].path, router: Router});
        app.use(routers[index].path, Router);
    }
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


const startServer = async () => {
    try {
        // connecting to database
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
        
        await useRouters(routers);
        console.log('Routers created');
        
        // listening to port 
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Listening to port ${port}`);
            fetchRoutes(generatedRouters);
            const endTimestamp = new Date().getTime();
            const timeTaken = endTimestamp - startTimestamp;
            console.log(`Time taken to start server: ${timeTaken} ms`);
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