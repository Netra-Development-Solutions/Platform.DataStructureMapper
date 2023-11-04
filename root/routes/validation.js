const { validateSchema } = require('../controllers/Validate/validateSchema');

const routesConfig = [
    {
        method: 'post',
        path: '/ValidateSchema',
        controller: validateSchema,
        middleware: [],
        inputSchema: {
            key: 'TestSchema',
            version: '1'
        },
        description: 'Validate schema against data API'
    }
]

module.exports = routesConfig;