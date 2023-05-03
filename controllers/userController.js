// to handle incoming requests from the client, query database via the model, and send response back to client
const { User, Thought } = require('../models');

module.exports = {
  // Get all Users (actual number included bc of aggregate func)
  async getUsers(req, res) {
    try {
      const users = await User.find();

      // List of all users as well as number of users
      const userObj = {
        users,
        userCount: await userCount(),
      };
    // Return all user data in JSON format 
      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user and include their friends and thoughts 
  async getSingleUser(req, res) {
    try {
      const userData = await userData.findOne({ _id: req.params.userId }) //Find by the ID in the req parameters
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

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
      const newUser = await newUser.create(req.body);
      // Return new user data in JSON format 
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user by their id
  async updateUser(req, res) {
    try {
        const updateUserData = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true } // Return updated user, 
        );
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

  // Find user and their thoughts by user id and delete them
  async deleteUser(req, res) {
    try {
      const deleteUser = await deleteUser.findOneAndDelete({ _id: req.params.userId }).select('+thoughts');

      if (!deleteUser) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      // From user id - delete that user's thoughts
      await Thought.deleteMany({ _id: { $in: deleteUser.thoughts }})

      res.json({ message: 'User and their thoughts successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add Friends

  //Remove Friends

};
