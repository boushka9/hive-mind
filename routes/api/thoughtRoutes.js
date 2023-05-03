// Import Express and functions in controller file
const router = require('express').router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController')

//   /api/thoughts/
router.route('/').get(getThoughts).post(createThought); // Chain .get and .post for requests to '/' endpoint

//   /api/thoughts/:thoughtId
router.route('/:ThoughtId').get(getSingleThought).put(updateThought).delete(deleteThought); // Chain .get, .put, and .delete for requests to '/:ThoughtId' endpoint

// /api/thoughts/ + reaction routes


module.exports = router