// Import Express and functions in controller file
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

//   /api/users/
router.route('/').get(getUsers).post(createUser); // Chain .get and .post for requests to '/' endpoint

//   /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser); // Chain .get, .put, and .delete for requests to '/:userId' endpoint

//   /api/users/:userId/friends/:friendId
//router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)


module.exports = router