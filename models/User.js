const { Schema, model } = require('mongoose');

// Define structure for user data 
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/, // Regex for @ . of email
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Calculate the length of friends to get number of friends, not a stored value
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Provide interface for querying data
const User = model('User', userSchema);

module.exports = User;