const db = require('../models');
const redis = require('../config/redisConfig');
const Note = db.notes;
const CategoryFactory = require('../factories/categoryFactory');

const createNote = async (req, res) => {
    const { content, category } = req.body;
    const userId = req.userId;

    try {
        const validatedCategory = category !== undefined ? CategoryFactory.createCategory(category) : null;

        const note = await Note.create({
            content,
            userId,
            category: validatedCategory,
        });

        await redis.del(`notes:${userId}`);

        res.status(201).json({
            message: 'Note created successfully',
            note,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};


const getAllNotes = async (req, res) => {
    const userId = req.userId;

    try {
        const cachedNotes = await redis.get(`notes:${userId}`);
        if (cachedNotes) {
            return res.status(200).json(JSON.parse(cachedNotes));
        }

        const notes = await Note.findAll({ where: { userId } });

        // Adding to cache with TTL of 1h
        await redis.set(`notes:${userId}`, JSON.stringify(notes), 'EX', 3600);

        res.status(200).json({ notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving notes', error: error.message });
    }
};

const getNote = async (req, res) => {
    const { noteId } = req.params;
    const userId = req.userId;

    try {
        const cachedNote = await redis.get(`note:${noteId}`);
        if (cachedNote) {
            return res.status(200).json(JSON.parse(cachedNote));
        }

        const note = await Note.findOne({ where: { id: noteId, userId } });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await redis.set(`note:${noteId}`, JSON.stringify(note), 'EX', 3600);

        res.status(200).json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving note', error: error.message });
    }
};

const updateNote = async (req, res) => {
    const { noteId } = req.params;
    const { content, category } = req.body;
    const userId = req.userId;

    try {
        const note = await Note.findOne({ where: { id: noteId, userId } });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        const validatedCategory = category !== undefined ? CategoryFactory.createCategory(category) : note.category;

        note.content = content;
        note.category = validatedCategory;
        await note.save();

        await redis.del(`note:${noteId}`);
        await redis.del(`notes:${userId}`);

        res.status(200).json({ message: 'Note updated successfully', note });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    const { noteId } = req.params;
    const userId = req.userId;

    try {
        const note = await Note.findOne({ where: { id: noteId, userId } });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await note.destroy();

        await redis.del(`note:${noteId}`);

        await redis.del(`notes:${userId}`);

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting note', error: error.message });
    }
};

module.exports = { createNote, getAllNotes, getNote, updateNote, deleteNote };
