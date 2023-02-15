// DEPENDENCIES
const express = require("express");
const cors = require('cors');
const wrestlerController = require('./controllers/wrestlerController.js')
const app = express();

app.use(express.json())
app.use(cors())
app.use('/wrestlers', wrestlerController)

// ROUTES
app.get("/", (req, res) => {
  res.send("Ready to Run the Ropes?");
});

// 404 PAGE 
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found")
})

// EXPORT
module.exports = app;