const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  option1: {
    type: String,
    required: true,
  },

  option2: {
    type: String,
    required: true,
  },

  option3: {
    type: String,
    required: true,
  },

  option4: {
    type: String,
    required: true,
  },

  option1Count: {
    type: Number,
    default: 0,
  },
  option2Count: {
    type: Number,
    default: 0,
  },
  option3Count: {
    type: Number,
    default: 0,
  },
  option4Count: {
    type: Number,
    default: 0,
  },
  option1Percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  option2Percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  option3Percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  option4Percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  totalVotes: {
    type: Number,
  },
});

module.exports = mongoose.model("Poll", pollSchema);
