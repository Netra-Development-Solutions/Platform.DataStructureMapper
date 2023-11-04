// importing routes
const schemaCRUDRoutes = require('./routes/schemaCRUD');
const validationRoutes = require('./routes/validation');

const routers = [
    {
        path: '/api/schema',
        router: schemaCRUDRoutes
    },
    {
        path: '/api/validation',
        router: validationRoutes
    }
]

module.exports = routers;