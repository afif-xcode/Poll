const express = require("express");
const Poll = require("../models/pollModel");

const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    if (polls) {
      return res.status(200).json({ message: "Fetched all the polls", polls });
    }
    return res.status(400).json({ error: "Error fetching all the polls" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSinglePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);
    if (poll) {
      return res.status(200).json({ message: "Fetched the poll", poll });
    }
    return res.status(400).json({ error: "Error fetching the poll" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const votePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { option } = req.body;

    const poll = await Poll.findById(id);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // Increment selected option
    poll[`option${option}Count`] += 1;

    // Update total votes
    const totalVotes =
      poll.option1Count +
      poll.option2Count +
      poll.option3Count +
      poll.option4Count;

    poll.totalVotes = totalVotes;

    // Recalculate percentages
    poll.option1Percentage = Math.round((poll.option1Count / totalVotes) * 100);
    poll.option2Percentage = Math.round((poll.option2Count / totalVotes) * 100);
    poll.option3Percentage = Math.round((poll.option3Count / totalVotes) * 100);
    poll.option4Percentage = Math.round((poll.option4Count / totalVotes) * 100);

    await poll.save();

    return res.status(200).json({ message: "Vote recorded", poll });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createPoll = async (req, res) => {
  try {
    const { question, option1, option2, option3, option4 } = req.body;
    if (!question || !option1 || !option2 || !option3 || !option4) {
      console.log("Need all the fields");
      return res.status(400).json({ error: "Need all the fields" });
    }
    const poll = await Poll.create({
      question,
      option1,
      option2,
      option3,
      option4,
    });

    if (poll) {
      return res.status(201).json({ message: "Created new Poll", poll });
    }
    return res.status(400).json({ error: "Error creating a new poll" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, option1, option2, option3, option4 } = req.body;

    const poll = await Poll.findById(id);

    if (!poll) {
      return res.status(404).json({ error: `Poll with ID ${id} not found.` });
    }

    if (question) poll.question = question;
    if (option1) poll.option1 = option1;
    if (option2) poll.option2 = option2;
    if (option3) poll.option3 = option3;
    if (option4) poll.option4 = option4;

    await poll.save();

    return res.status(200).json({
      message: "Poll successfully updated.",
      poll,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid poll ID format." });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByIdAndDelete(id);
    if (poll) {
      return res.status(201).json({ message: "Deleted the polls" });
    }
    return res.status(400).json({ error: "Error deleting the polls" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPolls,
  getSinglePoll,
  createPoll,
  editPoll,
  deletePoll,
  votePoll,
};
