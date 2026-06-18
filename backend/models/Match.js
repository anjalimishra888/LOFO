const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    lostItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },

    foundItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },

    score: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "pending",
        "claimed",
        "recovered",
        "rejected"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Match",
  matchSchema
);