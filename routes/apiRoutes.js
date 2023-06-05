const router = require('express').Router();
const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid');

const readData = async () => {
  try {
    var data = await fs.readFile('/db/db.json', 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

router.get('/', async (req, res) => {
  var data = await readData()
  res.json(data)
});

router.post('/', async (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    const notes = await readData()
    notes.push(newNote)
    await fs.writeFile('/db/db.json', JSON.stringify(notes, null, 4))
    res.json('Note added successfully! 📖');
  } else {
    res.error('Oh no, something went wrong!');
  }
});

router.delete('/:id', async (req, res) => {
  console.log(req.params)
  const noteId = req.params.id;
  var notes = await readData()
  const newNotes = notes.filter((note) => note.id !== noteId);
  await fs.writeFile('/db/db.json', JSON.stringify(newNotes, null, 4))
  res.json("Note has been deleted 🗑️");
})

module.exports = router;