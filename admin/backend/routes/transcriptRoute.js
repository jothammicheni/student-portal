// routes/transcriptRoute.js
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import {Transcript} from '../models/transcriptModel.js';


const router = express.Router();

// Create multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get MongoDB connection
const conn = mongoose.connection;

// Upload transcript route
router.post('/:studentId', upload.single('transcript'), async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Create a GridFS bucket
    const bucket = new GridFSBucket(conn.db, { bucketName: 'transcripts' });

    // Store the file in GridFS
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', async () => {
      // Save the transcript reference in MongoDB
      const transcript = new Transcript({
        studentId,
        fileUrl: `/transcripts/${uploadStream.id}`,
      });

      await transcript.save();
      res.status(201).json({ message: 'Transcript uploaded successfully!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading transcript.', error });
  }
});

// Get transcript by student ID
router.get('/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const transcripts = await Transcript.find({ studentId });
    res.status(200).json(transcripts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transcripts.', error });
  }
});

export default router;


///to be updated