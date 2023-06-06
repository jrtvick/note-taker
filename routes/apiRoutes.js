const router = require("express").Router();
const getRandomID = require("../helpers/randomIDs");

const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/utilsFS");

router.get("/notes", (req, res) => {
  console.info(`${req.method} request recieved for notes`);
  readFromFile("./db/db.json").then((data) => {
    res.json(JSON.parse(data));
  });
});

router.post("/notes", (req, res) => {
  console.info(`${req.method} request recieved for notes`);

  const { title, text } = req.body;

  if (req.body) {
    const newNotes = {
      title,
      text,
      id: getRandomID(),
    };

    readAndAppend(newNotes, "./db/db.json");
    res.json("Note added successfully");
  } else {
    res.error("Error");
  }
});

router.delete("/notes/:id", (req, res) => {
  console.log(req.params);
  console.info(`${req.method} request recieved for notes`);
  const notesid = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const deleting = json.filter(
        (title, text) => title.id !== notesid && text.id !== notesid
      );

      writeToFile("./db/db.json", deleting);

      res.json(`Note ${notesid} has been deleted`);
    });
});

module.exports = router;