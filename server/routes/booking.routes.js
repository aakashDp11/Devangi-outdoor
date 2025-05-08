import express from 'express';
import Booking from '../models/booking.model.js';
import Space from '../models/space.model.js';

const router = express.Router();

// CREATE - POST /api/bookings
// router.post('/', async (req, res) => {
//   try {
//     const spacesExist = await Space.find({ _id: { $in: req.body.spaces } });

//     if (spacesExist.length !== req.body.spaces.length) {
//       return res.status(400).json({ error: 'One or more invalid space IDs' });
//     }

//     const newBooking = new Booking(req.body);
//     const savedBooking = await newBooking.save();
//     res.status(201).json({ message: 'Booking created successfully', data: savedBooking });
//   } catch (error) {
//     console.error('Booking creation error:', error);
//     res.status(400).json({ error: 'Failed to create booking', details: error.message });
//   }
// });
router.post('/', async (req, res) => {
  try {
    const spacesExist = await Space.find({ _id: { $in: req.body.spaces } });

    if (spacesExist.length !== req.body.spaces.length) {
      return res.status(400).json({ error: 'One or more invalid space IDs' });
    }

    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    // ✅ After booking is saved, update the spaces
    await Space.updateMany(
      { _id: { $in: req.body.spaces } },
      { $set: { available: false } }
    );

    res.status(201).json({ message: 'Booking created successfully', data: savedBooking });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(400).json({ error: 'Failed to create booking', details: error.message });
  }
});


// READ ALL - GET /api/bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('spaces');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
  }
});

// READ ONE - GET /api/bookings/:id
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('spaces');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking', details: error.message });
  }
});

// UPDATE - PUT /api/bookings/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('space');

    if (!updatedBooking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking updated successfully', data: updatedBooking });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update booking', details: error.message });
  }
});

// DELETE - DELETE /api/bookings/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully', data: deletedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking', details: error.message });
  }
});

export default router;
