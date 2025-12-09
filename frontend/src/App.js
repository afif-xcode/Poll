import React from "react";
import { Routes, Route } from "react-router-dom";

// Importing pages from the 'pages' directory
import Home from "./pages/Home";
import PollDetails from "./pages/PollDetails";
import CreatePoll from "./pages/CreatePoll";
import EditPoll from "./pages/EditPoll";
import DeletePoll from "./pages/DeletePoll";

const App = () => {
  return (
    <Routes>
      {/* Dashboard / Landing Page */}
      <Route path="/" element={<Home />} />

      {/* View a specific poll to vote */}
      <Route path="/poll/:id" element={<PollDetails />} />

      {/* Create a new poll */}
      <Route path="/poll/create" element={<CreatePoll />} />

      {/* Edit an existing poll */}
      <Route path="/poll/edit/:id" element={<EditPoll />} />

      {/* Delete confirmation page */}
      <Route path="/poll/delete/:id" element={<DeletePoll />} />
    </Routes>
  );
};

export default App;
