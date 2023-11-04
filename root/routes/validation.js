const express = require('express');
const { validateSchema } = require('../controllers/Validate/validateSchema');

// Creating router
const router = express.Router();

const routesConfig = [
    {
        method: 'post',
        path: '/ValidateSchema',
        controller: validateSchema,
        middleware: [],
        inputSchema: {
            key: 'TestSchema',
            version: '1'
        }
    }
]

// METHOD : GET
// PATH : /api/validation/get-all
// route for getting all validations

// METHOD : POST
// PATH : /api/validation/ValidateSchema
// route for creating a validation
router.post('/ValidateSchema', validateSchema);

module.exports = routesConfig;