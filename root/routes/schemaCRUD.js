const express = require('express');
const { updateSchema } = require('../controllers/SchemaCRUD/updateSchema');

// Creating router
const router = express.Router();

// METHOD : GET
// PATH : /api/schema/get-all
// route for getting all schemas
router.get('/get-all', (req, res) => {
    res.send('get all schemas');
});

// METHOD : POST
// PATH : /api/schema/schema
// route for creating a schema
router.post('/schema', updateSchema);

module.exports = router;