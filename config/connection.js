// Import ODM for MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log('MongoDB successfully connected'))
.catch((err) => console.log(err));

module.exports = mongoose.connection;