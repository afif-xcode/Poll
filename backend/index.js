require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const pollRouter = require("./routes/pollRouter");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); //

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(pollRouter); //

app.get("/", (req, res) => {
  res.send("<h1>Welcome to polls server</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
