const JSONschemaCore = require('../../models/JSONschemaCore');

// importing utils
const { successResponse, errorResponse } = require('../../utils/response');

const updateSchema = async (req, res) => {
    try {

        const { schema } = req.body;

        const schemaToUpdate = await JSONschemaCore.findOne({ version: schema?.version, key: schema?.key });
        if (!schemaToUpdate) {
            const newSchema = new JSONschemaCore(schema);
            return successResponse(res, await newSchema.save(), 'Schema added successfully');
        } else {
            schemaToUpdate.schema = schema.schema;
            schemaToUpdate.name = schema.name;
            schemaToUpdate.description = schema.description;
            schemaToUpdate.metadata = schema.metadata;
            schemaToUpdate.key = schema.key;
            await schemaToUpdate.save();
            return successResponse(res, schemaToUpdate, 'Schema updated successfully');
        }

    } catch (err) {
        console.log(err);
        return errorResponse(res, 'Internal server error', 500);
    }
};

module.exports = {
    updateSchema
};