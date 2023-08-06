const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config')

const uri = config.databaseUrl;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Server');

    // Define the User schema
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      age: { type: Number },
    });

    // Create the User model
    const User = mongoose.model('User', userSchema);

    // Example: Inserting multiple users into the database
    const usersToInsert = [
      { name: 'Emma watson', email: 'fhfhfjj@example.com', age: 37 },
      { name: 'Steve johson', email: 'stevel@example.com', age: 25 },
      { name: 'Harley david', email: 'david@example.com', age: 35 },
      { name: 'ben chillwell', email: 'ben@example.com', age: 38 },
      { name: 'thiago silva', email: 'silva@example.com', age: 39 },
    ];

    const insertedUsers = await User.insertMany(usersToInsert);
    console.log('Users inserted:', insertedUsers);

    // Example: Finding all users in the database
    const allUsers = await User.find({});
    console.log('All Users:');
    console.log(allUsers);

    // Example: Finding a user by email
    const foundUser = await User.findOne({ email: 'ben@example.com' });
    console.log('User found:');
    console.log(foundUser);

    // Example: Updating the age of a user by email
    const updatedUser = await User.findOneAndUpdate(
      { email: 'mason@example.com' },
      { age: 37 },
      { new: true } // Returns the updated document
    );
    console.log('User updated:');
    console.log(updatedUser);

    // Example: Deleting a user by email
    const deletedUser = await User.findOneAndDelete({ email: 'silva@example.com' });
    console.log('User deleted:');
    console.log(deletedUser);

    // Close the Mongoose connection
    await mongoose.connection.close();
    console.log('Connection to MongoDB closed.');
  } catch (error) {
    console.error('Error:', error);
  }
}

connectToDatabase();
