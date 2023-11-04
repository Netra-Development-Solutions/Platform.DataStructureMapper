const express = require('express');
const { updateSchema } = require('../controllers/SchemaCRUD/updateSchema');

// Creating router
const router = express.Router();

// METHOD : GET
// PATH : /api/schema/get-all
// route for getting all schemas

// METHOD : POST
// PATH : /api/schema/create
// route for creating a schema
router.post('/create', updateSchema);

module.exports = router;