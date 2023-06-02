const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 7), (err) =>
    err
      ? console.error("Error!")
      : console.info(`\nData written to ${destination}`)
  );
