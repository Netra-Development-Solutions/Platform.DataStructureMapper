const { updateSchema } = require('../controllers/SchemaCRUD/updateSchema');

const routesConfig = [
    {
        method: 'post',
        path: '/manage',
        controller: updateSchema,
        middleware: [],
        inputSchema: {
            key: 'CreateSchemaAPI',
            version: '1'
        },
        description: 'Update schema API'
    }
]

module.exports = routesConfig;