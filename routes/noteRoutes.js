const express = require('express');
const { createNote, getAllNotes, getNote, updateNote, deleteNote } = require('../controllers/noteController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, createNote);
router.get('/', authenticateUser, getAllNotes);
router.get('/:noteId', authenticateUser, getNote);
router.put('/:noteId', authenticateUser, updateNote);
router.delete('/:noteId', authenticateUser, deleteNote);

module.exports = router;
