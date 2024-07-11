const mongoose = require('mongoose');

// Define the schema for a idea post
const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: []
    },
    image: {
      type: Buffer,  // Storing image as binary data
      contentType: String
    },
    upvotes: {
      type: Number,
      default: 0
    },
    downvotes: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
});

// Pre-save middleware to update the `updatedAt` field
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema
const Post = mongoose.model('Post', postSchema);

// Export the model
module.exports = Post;
