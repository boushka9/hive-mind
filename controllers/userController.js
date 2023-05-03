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

  //Remove Friends

};
