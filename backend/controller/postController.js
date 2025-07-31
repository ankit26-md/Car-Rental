const CarPost = require('../models/postcar');
const multer = require('multer');
const path = require('path');
// ========== Multer Setup  ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
};

const upload = multer({ storage, fileFilter });

// Expose multer middleware for routes
exports.uploadCarImages = upload.fields([
  { name: 'carimage1', maxCount: 1 },
  { name: 'carimage2', maxCount: 1 }
]);

// ========== CREATE ==========
exports.createCarPost = async (req, res) => {
  try {
    const files = req.files;

    const carPost = new CarPost({
      catid: req.body.catid,
      cartitle: req.body.cartitle,
      shortdescription: req.body.shortdescription,
      carimage1: files?.carimage1?.[0]?.filename || '',
      carimage2: files?.carimage2?.[0]?.filename || '',
      postdate: req.body.postdate,
      price: req.body.price,
      variant: req.body.variant,
      driverstatus: req.body.driverstatus,
      registrationyear: req.body.registrationyear,
      carvehicleno: req.body.carvehicleno,
      ownername:req.body.ownername,
      ownermobile:req.body.ownermobile,
      available: req.body.available !== undefined ? req.body.available : true
    });

    await carPost.save();
    res.status(201).json({ message: 'Car post created successfully', data: carPost });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create car post', details: err.message });
  }
};

// ========== //get all posted car ==========
exports.getAllCarPosts = async (req, res) => {
  try {
    const carPosts = await CarPost.find({ available: true }).populate('catid','catname');
    res.status(200).json(carPosts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car posts', details: err.message });
  }
};
// ========== //get all posted car BY ID ==========
exports.getCarPostById = async (req, res) => {
  try {
    const carPost = await CarPost.findById(req.params.id).populate('catid');
    if (!carPost) return res.status(404).json({ message: 'Car post not found' });
    res.status(200).json(carPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car post', details: err.message });
  }
};

// ========== UPDATE Posted car==========
exports.updateCarPost = async (req, res) => {
  try {
    const files = req.files;
    const updateData = { ...req.body };

    if (files?.carimage1) updateData.carimage1 = files.carimage1[0].filename;
    if (files?.carimage2) updateData.carimage2 = files.carimage2[0].filename;

    const updatedCarPost = await CarPost.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedCarPost) return res.status(404).json({ message: 'Car post not found' });

    res.status(200).json({ message: 'Car post updated successfully', data: updatedCarPost });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update car post', details: err.message });
  }
};
// ========== DELETE Posted Car==========
exports.deleteCarPost = async (req, res) => {
  try {
    const deletedCarPost = await CarPost.findByIdAndDelete(req.params.id);
    if (!deletedCarPost) return res.status(404).json({ message: 'Car post not found' });
    res.status(200).json({ message: 'Car post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete car post', details: err.message });
  }
};
