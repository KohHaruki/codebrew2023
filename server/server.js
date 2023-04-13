const express = require("express");
const app = express();

const { json } = require("express");

// ========== EXAMPLE ============
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// Get users
app.get("/user", (req, res) => {
  res.send(JSON.stringify(user_database));
});
// ========== EXAMPLE END ===========

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
