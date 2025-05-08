export const uploadStepFile = async (req, res) => {
    const { bookingId, step } = req.params;
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const fileUrl = `/uploads/${file.filename}`; // Relative URL for frontend use
  
    const fieldMap = {
      artwork: 'artwork.documentUrl',
      po: 'po.documentUrl',
      invoice: 'invoice.documentUrl',
    };
  
    const targetField = fieldMap[step];
    if (!targetField) {
      return res.status(400).json({ message: 'Invalid step for upload' });
    }
  
    try {
      const update = {};
      update[targetField] = fileUrl;
  
      const pipeline = await Pipeline.findOneAndUpdate(
        { booking: bookingId },
        { $set: update },
        { new: true }
      );
  
      if (!pipeline) return res.status(404).json({ message: 'Pipeline not found' });
  
      res.status(200).json({ message: 'File uploaded successfully', fileUrl, pipeline });
    } catch (err) {
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
  };
  