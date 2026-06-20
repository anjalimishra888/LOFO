const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "lost",
        "found",
        "recovered"
      ],
      required: true
    },

    image: {
      type: String
    },

    location: {
      type: String
    },

    itemType: {
      type: String,
      enum: ["lost", "found"],
      default: "lost"
    },

    itemStatus: {
      type: String,
      enum: ["open", "pending", "resolved"],
      default: "open"
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Item",
  itemSchema
);