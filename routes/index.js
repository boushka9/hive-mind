// Import express and paths to api routes folder
const router = require('express').Router();
const apiRoutes = require('./api');

//Direct routes to api folder
router.use('/api', apiRoutes);

module.exports = router;