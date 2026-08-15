const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    analysis: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    atsScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);