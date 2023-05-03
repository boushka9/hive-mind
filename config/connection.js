// Import ODM for MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/networkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB successfully connected'))
.catch((err) => console.log(err));

module.exports = mongoose.connection;