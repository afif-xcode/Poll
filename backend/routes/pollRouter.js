const express = require("express");

const {
  getAllPolls,
  getSinglePoll,
  createPoll,
  editPoll,
  deletePoll,
  votePoll,
} = require("../controllers/pollController");

const Router = new express.Router();

Router.get("/", getAllPolls);
Router.get("/poll/:id", getSinglePoll);
Router.post("/poll/create", createPoll);
Router.patch("/poll/edit/:id", editPoll);
Router.delete("/poll/delete/:id", deletePoll);
Router.post("/poll/:id/vote", votePoll);

module.exports = Router;
