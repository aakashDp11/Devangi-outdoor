import express from 'express';
import multer from 'multer';
import Booking from '../models/booking.model.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Or use cloud storage

// Update with form data
router.post('/:id/pipeline/update', async (req, res) => {
  const { stage, data } = req.body;

  const booking = await Booking.findById(req.params.id);
  if (!booking.pipeline) booking.pipeline = {};

  booking.pipeline.set(stage, {
    status: 'done',
    updatedAt: new Date(),
    data
  });

  await booking.save();
  res.json({ message: 'Stage updated successfully', pipeline: booking.pipeline });
});

// Upload artwork
router.post('/:id/upload-artwork', upload.array('artwork'), async (req, res) => {
  const files = req.files.map(file => file.path);

  const booking = await Booking.findById(req.params.id);
  booking.pipeline.set('Upload Artwork', {
    status: 'done',
    updatedAt: new Date(),
    data: { files }
  });

  await booking.save();
  res.json({ message: 'Artwork uploaded', files });
});

export default router;
