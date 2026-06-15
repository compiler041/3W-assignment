const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Post = require('./models/Post');

const MONGODB_URI = process.env.MONGODB_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Dummy Users
    const salt = await bcrypt.genSalt();
    const defaultPassword = await bcrypt.hash('password123', salt);

    const usersToCreate = [
      { username: 'john_doe', email: 'john@example.com', password: defaultPassword },
      { username: 'jane_smith', email: 'jane@example.com', password: defaultPassword },
      { username: 'alice_w', email: 'alice@example.com', password: defaultPassword },
      { username: 'bob_builder', email: 'bob@example.com', password: defaultPassword },
    ];

    const users = [];
    for (let u of usersToCreate) {
      const exists = await User.findOne({ username: u.username });
      if (!exists) {
        const newUser = await User.create(u);
        users.push(newUser);
      } else {
        users.push(exists);
      }
    }
    console.log('Users seeded');

    // Clear existing posts to avoid duplicates
    await Post.deleteMany({});

    // Insert posts directly (bypass pre-save hook)
    const dummyPosts = [
      {
        userId: users[0]._id,
        username: users[0].username,
        content: 'Just had an amazing coffee this morning! ☕ Ready to tackle some coding challenges. #morningvibes #coding',
        imageUrl: '',
        likes: [users[1].username, users[2].username],
        comments: [
          { username: users[1].username, text: 'Coffee is life! 🙌', createdAt: new Date() },
          { username: users[3].username, text: 'Good luck with the coding!', createdAt: new Date() }
        ]
      },
      {
        userId: users[1]._id,
        username: users[1].username,
        content: 'Exploring the new React 19 features and absolutely loving it! The new use() hook is a game changer. 🚀',
        imageUrl: '',
        likes: [users[0].username, users[2].username, users[3].username],
        comments: [
          { username: users[0].username, text: 'I need to check that out!', createdAt: new Date() },
          { username: users[2].username, text: 'Agreed, it simplifies so much boilerplate.', createdAt: new Date() }
        ]
      },
      {
        userId: users[2]._id,
        username: users[2].username,
        content: 'Beautiful sunset at the beach today 🌅 Nature is the best reset button.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        likes: [users[0].username, users[1].username, users[3].username],
        comments: [
          { username: users[1].username, text: 'Wow, stunning view!', createdAt: new Date() },
          { username: users[3].username, text: 'Wish I was there!', createdAt: new Date() }
        ]
      },
      {
        userId: users[3]._id,
        username: users[3].username,
        content: 'Anyone have good recommendations for a mechanical keyboard? Looking for something tactile but not too loud. ⌨️',
        imageUrl: '',
        likes: [users[0].username],
        comments: [
          { username: users[2].username, text: 'Keychron Q1 with Brown switches is great!', createdAt: new Date() },
        ]
      }
    ];

    await Post.insertMany(dummyPosts);
    console.log('Posts seeded');

    console.log('Done! Exiting.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
