const router = require("express").Router()
const path = require('path');
console.log(path.join(__dirname, './public/index.html'))

router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/pages/notes.html'))
);

router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

module.exports = router;