const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Set structure for thought data
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
          // format timestamp as readable string
          return new Date(timestamp).toLocaleString();
        }
    },
    username: {
        type: String,
        required: true,
    },
    reactions:  [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Calculate the length of friends to get number of friends, not a stored value
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Provide interface to query thought data 
const Thought = model('Thought',thoughtSchema);

module.exports = Thought;