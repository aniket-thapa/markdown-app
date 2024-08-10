const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  shareableLink: { type: String, required: true, unique: true },
  date_of_creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", FileSchema);
