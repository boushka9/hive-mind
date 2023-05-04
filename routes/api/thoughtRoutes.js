// Import Express and functions in controller file
const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

//   /api/thoughts/
router.route('/').get(getThoughts).post(createThought); // Chain .get and .post for requests to '/' endpoint

//   /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought); // Chain .get, .put, and .delete for requests to '/:thoughtId' endpoint

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction) // Add reaction to specific thought

router.route('/:thoughtId/reactions/:id').delete(deleteReaction); // Go to specific thought by ID, then go to reactions and get a specific reaction by it's ID



module.exports = router