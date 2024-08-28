const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the publication date to the current date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically sets the updated date to the current date
    },
    images: [
      {
        url: { type: String, required: false }, // URL of the image
        caption: { type: String, required: false }, // Optional caption for the image
      },
    ],
    tags: [
      {
        type: String,
      },
    ], // Array of tags related to the blog
    isPublished: {
      type: Boolean,
      default: false, // By default, the blog is not published
    },
    comments: [
      {
        user: { type: String, required: true }, // The name or ID of the user commenting
        message: { type: String, required: true }, // The comment message
        date: { type: Date, default: Date.now }, // Timestamp for the comment
      },
    ], // Array of comments
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Blog', blogSchema);
