// models/transcriptModel.js

const mongoose = require('mongoose');

// Define the schema for storing transcripts
const transcriptSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Transcript = mongoose.model('Transcripts', transcriptSchema);
module.exports = Transcript;
