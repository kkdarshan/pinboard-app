import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();
// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST 
router.post('/', async (req, res) => {
  const { title, content, x, y } = req.body;
  try {
    const newNote = new Note({ title, content, x, y });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body, // can update position 
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;
