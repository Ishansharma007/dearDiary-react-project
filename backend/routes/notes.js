const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Note = require("../models/Notes-model");
const { body, validationResult } = require('express-validator');



// Route 1 : get all notes of a user : GET "/api/notes/fetchallnotes" login required  .

router.get("/fetchallnotes", fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error");
    }

});

// Route 2 : add new notes : POST "/api/notes/addnote" login required  .

router.post("/addnote", fetchUser, [
    body('title', "title is too short").isLength({ min: 4 }),
    body('description', "description must be minimum 10 characters").isLength({ min: 3 })
], async (req, res) => {

    try {
        // If there are errors send bad request .
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error");
    }

});

// Route 3 : update existing note : POST "/api/notes/updatenote" login required  .

router.put("/updatenote/:id", fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {

        // Create a newNote object

        const newNote = {};
        if (title) { newNote.title = title };
        if (title) { newNote.description = description };
        if (title) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("You are not allowed to access someone elses notes") };

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error");
    }
});

// Route 4 : delete existing note : POST "/api/notes/updatenote" login required  .

router.delete("/deletenote/:id", fetchUser, async (req, res) => {

    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("You are not allowed to access someone elses notes") };

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({message: "succesfully deleted note"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error");
    }



});


module.exports = router;