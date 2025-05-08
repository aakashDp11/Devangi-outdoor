import Space from "../models/space.model.js";

export const createSpace = async (req, res) => {
  try {
    const {
      body,
      files: { mainPhoto, longShot, closeShot, otherPhotos },
    } = req;
    // console.log("BODY:", req.body);
    // console.log("FILES:", req.files);
    
    const space = new Space({
      ...body,
      price: parseFloat(body.price),
      footfall: parseInt(body.footfall),
      mainPhoto: mainPhoto?.[0]?.filename,
      longShot: longShot?.[0]?.filename,
      closeShot: closeShot?.[0]?.filename,
      otherPhotos: otherPhotos?.map((f) => f.filename) || [],
    });
    console.log("SPACE TO SAVE:", space);
    const saved = await space.save();
    console.log("Done file saved");
    res.status(201).json({ message: 'Space created', data: saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create space', details: error.message });
  }
};
