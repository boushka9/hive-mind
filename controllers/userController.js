// to handle incoming requests from the client, query database via the model, and send response back to client
const { User, Thought } = require('../models');

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      // List of all users
      const allUsers = users;
      
      // Return all user data in JSON format 
      res.json(allUsers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user and include their friends and thoughts 
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId }) //Find by the ID in the req parameters
        .select('-__v') // Make response more concise by ignoring versions
        .populate('friends')
        .populate('thoughts');

        // if user can't be found by search id
      if (!userData) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      // Format the user data as JSON
      res.json(userData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      // Return new user data in JSON format 
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user by their id with the $set property
  async updateUser(req, res) {
    try {
        const updateUserData = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true } // Return updated user, 
        );
        // If user can't be found to update
        if(!updateUserData) {
            return res.status(404).json({ message: 'No user with that ID' })
        }
        // Return new user data in JSON format 
        res.json(updateUserData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

  // Find a specific user and their thoughts by the user id to delete them
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndDelete({ _id: req.params.userId }).select('+thoughts');

      // If User can be found res w error msg
      if (!deleteUser) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      // From user id - delete that user's thoughts
      await Thought.deleteMany({ _id: { $in: deleteUser.thoughts }})

      // On successful delete message
      res.json({ message: 'User and their thoughts successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add Friends
  async addFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate( // Updating existing User to add a friend to their friends array
        { _id: req.params.userId }, // Search the User document for entered ID
        { $addToSet: { friends: req.params.friendId } }, // Add to the set (array) of friends, the value given in params
        { new: true } // Return updated document instead of original 
      );
        // If unable to find User to add friend to
      if (!newFriend) {
        return res.status(404).json({ message: 'Unable to add friend to User with that ID.' });
      }
      // Respond with Updated User+newFriend in JSON format
      res.json(newFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  //Remove Friends
  async deleteFriend(req, res) {
    try {
        const deleteFriend = await User.findOneAndUpdate( // Updating existing User to remove a friend from their friends array
        { _id: req.params.userId }, // Search User document for entered ID
        { $pull: { friends: req.params.friendId } }, // Remove entered ID from the set of IDs in friends array
        { new: true } // Return Updated User/friends array 
        );

        // If User is not found or unable to remove friend
        if(!deleteFriend) {
            return res.status(404).json({ message: 'Unable to remove friend from User with that ID' })
        }

        // If friend is removed respond with updated User/friends in JSON format
        res.json({ message: "Successfully deleted friend"})
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
  }

};
