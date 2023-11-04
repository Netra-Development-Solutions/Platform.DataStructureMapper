const JSONschemaCore = require('../../models/JSONschemaCore');

// importing utils
const { successResponse, errorResponse } = require('../../utils/response');

const updateSchema = async (req, res) => {
    try {
        const { schema } = req.body;

        const schemaToUpdate = await JSONschemaCore.findOne({ _id: schema?._id, version: schema?.version });
        if (!schemaToUpdate) {
            const newSchema = new JSONschemaCore({
                name: schema.name,
                version: schema.version,
                schema: schema.schema,
                description: schema.description,
                metadata: schema.metadata
            });
            return successResponse(res, await newSchema.save(), 'Schema added successfully');
        } else {
            schemaToUpdate.schema = schema.schema;
            schemaToUpdate.name = schema.name;
            schemaToUpdate.description = schema.description;
            schemaToUpdate.metadata = schema.metadata;
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