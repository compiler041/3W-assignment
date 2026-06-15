const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  likes: [{
    type: String // store usernames
  }],
  comments: [{
    username: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

// Ensure that a post has at least content or imageUrl
postSchema.pre('save', function(next) {
  if (!this.content && !this.imageUrl) {
    return next(new Error('Post must have either content or an image.'));
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
