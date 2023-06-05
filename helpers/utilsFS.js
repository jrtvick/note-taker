const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 7), (err) =>
    err
      ? console.error("Error!")
      : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parseNotes = JSON.parse(data);
      parseNotes.push(content);
      writeToFile(file, parseNotes);
    }
  });
};

module.exports = { readAndAppend, readFromFile, writeToFile };