const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Chat',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a message'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);