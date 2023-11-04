const JSONschemaCore = require('../models/JSONschemaCore');
const JsonValidationEngine = require('@netra-development-solutions/json_validation_engine-lib');

// importing utils
const { successResponse, errorResponse } = require('../utils/response');

const validateSchemaMiddleware = (generatedSchema, generateRoutes) => {
    const ValidationFunction = async (req, res, next) => {
        try {
            // get api endpoint
            const startTimestamp = new Date().getTime();
            const apiEndpoint = req.originalUrl.split('/')[req.originalUrl.split('/').length - 1];

            const schemaKey = generateRoutes[`/${apiEndpoint}`].inputSchema.key;
            const version = generateRoutes[`/${apiEndpoint}`].inputSchema.version;

            const schemaIdentifier = `${schemaKey}_${version}`;

            var schemaResponse = generatedSchema[schemaIdentifier];

            if (!generatedSchema[schemaIdentifier]) {
                schemaResponse = (await JSONschemaCore.findOne({ key: schemaKey, version: version })).schema;
            }

            const data = req.body;

            if (!schemaResponse) {
                return errorResponse(res, { error: 'Schema not found' }, 404);
            }

            schemaInstance = new JsonValidationEngine.ValidateSchema(data, schemaResponse);

            const isValid = schemaInstance.validateData();
            const endTimestamp = new Date().getTime();

            const timeTaken = endTimestamp - startTimestamp;

            if (isValid) {
                return next();
            }

            return errorResponse(res, { schemaValidationResponse: isValid ? true : schemaInstance.errors, startTimestamp, endTimestamp, timeTaken }, 400);
        } catch (err) {
            console.log(err);
            return errorResponse(res, 'Internal server error', 500);
        }
    }
    return ValidationFunction;
};

module.exports = { validateSchemaMiddleware };