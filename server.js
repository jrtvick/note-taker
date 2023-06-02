// Import routes
const express = require("express");
const path = require("path");
const routes = require("./routes");

// User environment set
const PORT = process.env.PORT || 3001;

//Create express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/routes", routes);

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
