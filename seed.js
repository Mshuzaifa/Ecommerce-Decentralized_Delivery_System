const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,  // Deprecated, can be removed
    useUnifiedTopology: true,  // Deprecated, can be removed
});

const seedAdmin = async () => {
    try {
        // Delete any existing user with this email
        const deletedUser = await User.deleteOne({ email: 'mohammadhuzaifa@gmail.com' });
        console.log('Deleted user:', deletedUser);  // Log the result of the deletion

        // Hash the password
        const hashedPassword = await bcrypt.hash('password', 10);

        // Create the admin user
        const adminUser = new User({
            name: 'Super Admin',
            email: 'mohammadhuzaifa@gmail.com',
            password: hashedPassword, // Hashed password
            isAdmin: true
        });

        // Save the admin user to the database
        await adminUser.save();
        console.log('Admin user created successfully');
        
        // Close the MongoDB connection after the operation
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding admin user:', err);
    }
};

// Run the seed function
seedAdmin();
