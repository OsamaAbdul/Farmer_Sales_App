import express from 'express';
import multer from 'multer';
import path from 'path';
import Products from '../models/Products.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only JPEG/JPG/PNG images are allowed'));
  },
}).array('images', 3); // Allow up to 3 images

// Add a new product (for farmers only)
const addProducts = (req, res) => { // Remove async here since upload handles the async flow
  console.log('User attempting to add product:', req.user);
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ msg: 'Only farmers can list products' });
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    try {
      const { name, description, price, quantity, category } = req.body; // Destructure here
      const imagePaths = req.files ? req.files.map(file => file.path) : []; // Handle case with no files

      const product = new Products({
        seller: req.user.id,
        name,
        description,
        price,
        quantity,
        category,
        images: imagePaths, // Store image paths
      });

      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// Get all available products (for marketplace)
const getProducts = async (req, res) => {
  try {
    const products = await Products.find({ status: 'available' }).populate('seller', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get user's listed products (for dashboard)
const getProductsList = async (req, res) => {
  try {
    const products = await Products.find({ seller: req.user.id }).populate('seller', 'name');
    if (!products) {
      return res.status(404).json({ msg: 'No products found for this user' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export { addProducts, getProducts, getProductsList };