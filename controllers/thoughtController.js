const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts 
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      // List of all thoughts
      const allThoughts = thoughts;
      
      // Return all thought data in JSON format 
      res.json(allThoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought and include their friends and thoughts 
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId }) //Find by the ID in the req parameters

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }
      // Format the thought data as JSON
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      // Return new thought data in JSON format 
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought by their id
  async updateThought(req, res) {
    try {
        const updateThoughtData = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }, // Set will include thoughtText, createdAt, Username, and reactions referencing reaction schema
            { runValidators: true, new: true } // Return updated thought, 
        );
        // If no thought is found to update, res w error msg
        if(!updateThoughtData) {
            return res.status(404).json({ message: 'No thought with that ID' })
        }
        // Return new thought data in JSON format 
        res.json(updateThoughtData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

  // Find thought and their thoughts by thought id and delete them
  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      // If thought is not found,
      if (!deleteThought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      // // Remove the corresponding thoughtID from the Users thoughts array
      // const userThoughts = await User.findOneAndUpdate(
      //   { thoughts: req.params.thoughtId }, // Find the thought by it's id
      //   { $pull: { thoughts: req.params.thoughtId } }, // Pull (remove) that id from the User's thought array
      //   { new: true } // Return the updated User document 
      // )
      // if (!userThoughts) {
      //   return res.status(404).json({ message: "No such thought ID in the user's array"})
      // }
      // If thought was successfully deleted, send success msg
      res.json({ message: "Thought successfully deleted!"});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add reaction to a thought
  async addReaction(req, res) {
    try {
        const addReaction = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId }, // Find the corresponding thought to the entered id
            { $addToSet: { reactions: req.body } }, // If entered reaction is not in array, add it
            { new: true } // Return updated Thought with added reaction
        )
        // If unable to add reaction
        if(!addReaction) {
            return res.status(404).json({ message: "Unable to add reaction to thought with that ID" })
        }
        // If added successfully, show updated reaction in JSON format
        res.json(addReaction)
    } catch (err) {
        console.log(err);
        res.status(500).json(err); 
    }
  },


  // Remove reaction from a thought
  async deleteReaction(req, res) {
    try {
        const deleteReaction = await Thought.findOneAndUpdate( // Find a single thought and update it by removing a reaction
            { _id: req.params.thoughtId },
            { $pull: { reactions: { id: req.params.reactionId } } }, // Find entered ID in reactions array and remove it
            { new: true } // Return updated Thought with reaction removed 
        )
        // If no reaction found to delete
        if(!deleteReaction) {
            return res.status(404).json({ message: "Unable to add reaction to thought with that ID" })
        }
        // If added successfully, show updated reaction in JSON format
        res.json(deleteReaction);
    }catch (err) {
        console.log(err);
        res.status(500).json(err); 
    }
  }

};
