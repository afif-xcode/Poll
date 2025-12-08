import React from "react";
import { Route, Routes } from "react-router-dom";
import PollCard from "./PollCard";
import Home from "./Home";
import PollEditForm from "./PollEditForm";
import DeletePoll from "./DeletePoll";
import PollCreateForm from "./PollCreateForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poll/:id" element={<PollCard />} />
        <Route path="/poll/create" element={<PollCreateForm />} />
        <Route path="/poll/edit/:id" element={<PollEditForm />} />
        <Route path="/poll/delete/:id" element={<DeletePoll />} />
      </Routes>
    </div>
  );
};

export default App;
