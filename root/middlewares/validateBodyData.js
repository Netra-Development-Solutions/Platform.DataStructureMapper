const JSONschemaCore = require('../models/JSONschemaCore');
const JsonValidationEngine = require('@netra-development-solutions/json_validation_engine-lib');

// importing utils
const { successResponse, errorResponse } = require('../utils/response');

const validateSchemaMiddleware = async (req, res, next) => {
    try {
        // get header key
        const schemaKey = req.header('Validation-Key');
        const version = req.header('Validation-Version');

        const startTimestamp = new Date().getTime();
        const data = req.body;

        const schemaResponse = await JSONschemaCore.findOne({ key: schemaKey, version: version });

        if (!schemaResponse) {
            return errorResponse(res, { error: 'Schema not found' }, 404);
        }

        schemaInstance = new JsonValidationEngine.ValidateSchema(data, schemaResponse.schema);
        
        const isValid = schemaInstance.validateData();
        const endTimestamp = new Date().getTime();

        const timeTaken = endTimestamp - startTimestamp;

        if (isValid) {
            return next();
        }

        return errorResponse(res, {schemaValidationResponse: isValid ? true : schemaInstance.errors, startTimestamp, endTimestamp, timeTaken}, 400);
    } catch (err) {
        console.log(err);
        return errorResponse(res, 'Internal server error', 500);
    }
};

module.exports = { validateSchemaMiddleware };