const mongoose = require('mongoose');
const Post = require('./models/Post');

const MONGODB_URI = 'mongodb+srv://rathodvaibhav2006_db_user:Vaibhav123@cluster0.mgw290y.mongodb.net/assignment';

async function cleanup() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Delete the two specific broken posts
    const result = await Post.deleteMany({
      imageUrl: { $regex: '^http://localhost' }
    });
    
    console.log(`Deleted ${result.deletedCount} broken posts.`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

cleanup();
