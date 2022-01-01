const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Note = require("../../models/Notes");
const User = require("../../models/User");

// @route   GET api/notes/user
// @desc    Get current user profile
// @access  Private

router.get("/user", auth, async (request, response) => {
  try {
    const notes = await Note.find({ user: request.user.id })
      .populate("user", ["name", "avatar"])
      .sort({ createdat: -1 });

    if (!notes) {
      return response
        .status(400)
        .json({ msg: "There is no notes form this user" });
    }

    response.json(notes);
  } catch (error) {
    console.error(error.message);

    response.status(500).send("Server Error");
  }
});

// @route   POST api/notes
// @desc    Create notes for the user
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required of the note").not().isEmpty(),
      check("note", "Note description is required").not().isEmpty(),
      check("createdat", "Created date is required").not().isEmpty(),
    ],
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }

    const { title, note, isarchived, createdat } = request.body;

    try {
      let user = await User.findById(request.user.id).select("-password");
      // console.log(user.id);
      newnote = new Note({ user: user.id, title, note, isarchived, createdat });
      await newnote.save();

      response.json(newnote);
    } catch (error) {
      console.log(error.message);
      response.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/notes/:note_id
// @desc    Delete Note
// @access  Private

router.delete("/:note_id", auth, async (request, response) => {
  try {
    let note = await Note.findOne({ id: request.params.note_id });

    if (!note) {
      return response.status(404).json({ msg: "Note not found" });
    }

    if (note.user.toString() !== request.user.id) {
      return response.status(401).json({
        msg: "User is not authorised",
      });
    }

    await note.remove();
    response.json({ msg: "Post has been removed" });
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return response.status(404).json({ msg: "Note not found" });
    }
    response.status(500).send("Server Error");
  }
});

// @route   PUT api/notes/:note_id
// @desc    Archive Note
// @access  Private

router.put(
  "/:note_id",
  [
    auth,
    [
      check("title", "Title is required of the note").not().isEmpty(),
      check("note", "Note description is required").not().isEmpty(),
      check("createdat", "Created date is required").not().isEmpty(),
    ],
  ],
  async (request, response) => {
    const { title, note, isarchived, createdat } = request.body;
    const noteField = {};
    noteField.user = request.user.id;
    if (title) noteField.title = title;
    if (note) noteField.note = note;
    if (isarchived) noteField.isarchived = isarchived;
    if (createdat) noteField.createdat = createdat;

    try {
      let note = await Note.findOne({ id: request.params.note_id });

      if (note) {
        if (note.user.toString() !== request.user.id) {
          return response.status(401).json({
            msg: "User is not authorised",
          });
        }

        note = await Note.findOneAndUpdate(
          {
            id: request.params.note_id,
          },
          {
            $set: noteField,
          },
          {
            new: true,
          }
        );

        return response.json(note);
      } else {
        return response.status(404).json({ msg: "Note not found" });
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/notes/archive/:note_id
// @desc    Archive Note
// @access  Private

router.put("/archive/:note_id", auth, async (request, response) => {
  const { isarchived } = request.body;
  const noteField = {};
  noteField.user = request.user.id;
  if (isarchived) noteField.isarchived = isarchived;

  try {
    let note = await Note.findOne({ id: request.params.note_id });

    if (note) {
      if (note.user.toString() !== request.user.id) {
        return response.status(401).json({
          msg: "User is not authorised",
        });
      }

      note = await Note.findOneAndUpdate(
        {
          id: request.params.note_id,
        },
        {
          $set: noteField,
        },
        {
          new: true,
        }
      );

      return response.json({ msg: "This note is been archived" });
    } else {
      return response.status(404).json({ msg: "Note not found" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Server Error");
  }
});

module.exports = router;
