const { Schema } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), //new objectId will be created
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
          // format timestamp as readable string
          return new Date(timestamp).toLocaleString();
        }
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


// Just a schema - only provides structure of data (doesn't provide an interface for querying [model])

module.exports = reactionSchema;