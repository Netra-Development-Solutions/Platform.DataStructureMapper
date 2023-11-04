const express = require('express');
const { validateSchema } = require('../controllers/Validate/validateSchema');
const JsonValidationEngine = require('@netra-development-solutions/json_validation_engine-lib');

// Creating router
const router = express.Router();

// METHOD : GET
// PATH : /api/validation/get-all
// route for getting all validations

// METHOD : POST
// PATH : /api/validation/ValidateSchema
// route for creating a validation
router.post('/ValidateSchema', validateSchema);

module.exports = router;