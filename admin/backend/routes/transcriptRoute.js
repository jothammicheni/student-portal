import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { Transcript } from '../models/transcriptModel.js';
import { Student } from '../models/studentModel.js';
import { PORT, CONNECTION_URL } from '../config.js';

const router = express.Router();

// Connect to MongoDB and create a GridFS bucket
const conn = mongoose.createConnection(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
let gfsBucket;

conn.once('open', () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'transcripts' });
  console.log('GridFSBucket initialized for transcripts.');
});

// Configure multer for file uploads
const storage = multer.memoryStorage(); // In-memory storage
const upload = multer({ storage });

// Upload a transcript
router.post('/:studentId', upload.single('transcript'), async (req, res) => {
  const { studentId } = req.params;

  try {
    // Validate the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create a GridFS bucket write stream to store the file
    const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
      metadata: { studentId: new mongoose.Types.ObjectId(studentId) },
    });

    // Write the file to GridFS
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', async () => {
      // Save the transcript info to the database after the file upload
      const newTranscript = new Transcript({
        studentId: new mongoose.Types.ObjectId(studentId),
        fileUrl: `/transcripts/file/${uploadStream.id}`, // Set the correct download URL
        uploadedAt: new Date(),
      });

      await newTranscript.save();
      return res.status(201).json({ message: 'Transcript uploaded successfully!' });
    });
  } catch (error) {
    console.error('Error uploading transcript:', error);
    return res.status(500).json({ message: 'Error uploading transcript', error });
  }
});

// Get all transcripts for a student
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const transcripts = await Transcript.find({ studentId });
    return res.status(200).json(transcripts);
  } catch (error) {
    console.error('Error fetching transcripts:', error);
    return res.status(500).json({ message: 'Error fetching transcripts', error });
  }
});

// Download a transcript by ID
router.get('/file/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve the file from GridFS
    const downloadStream = gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(id));

    res.set({
      'Content-Type': 'application/pdf', // Adjust as needed
      'Content-Disposition': `attachment; filename="transcript_${id}.pdf"`, // Set the download file name
    });

    // Pipe the file to the response
    downloadStream.pipe(res);

    downloadStream.on('error', (error) => {
      console.error('Error downloading transcript:', error);
      return res.status(404).json({ message: 'Transcript not found' });
    });
  } catch (error) {
    console.error('Error downloading transcript:', error);
    return res.status(500).json({ message: 'Error downloading transcript', error });
  }
});

// Delete a transcript by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Remove the transcript from the database
    const result = await Transcript.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Transcript not found' });
    }

    // Remove the file from GridFS
    await gfsBucket.delete(new mongoose.Types.ObjectId(id));

    return res.status(200).json({ message: 'Transcript deleted successfully!' });
  } catch (error) {
    console.error('Error deleting transcript:', error);
    return res.status(500).json({ message: 'Error deleting transcript', error });
  }
});

export default router;
