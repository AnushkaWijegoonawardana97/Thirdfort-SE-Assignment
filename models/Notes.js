const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  isarchived: {
    type: Boolean,
    required: false,
  },
  createdat: {
    type: Date,
    required: true,
  },
});

module.exports = Notes = mongoose.model("notes", NoteSchema);
