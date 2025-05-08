import express from 'express';
import {
  createPipelineForBooking,
  getPipelineByBooking,
  updatePipelineStep,
  uploadStepFile
} from '../controllers/pipeline.controller.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/:bookingId', createPipelineForBooking);
router.get('/:bookingId', getPipelineByBooking);

// Text updates (e.g., bookingStatus, payment, etc.)
router.put('/:bookingId/:step', updatePipelineStep);

// File upload for artwork, po, or invoice
router.post('/:bookingId/:step/upload', upload.single('file'), uploadStepFile);

export default router;
