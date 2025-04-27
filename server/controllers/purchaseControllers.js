// controllers/purchaseController.js
import Product from '../models/Products.js';

const purchaseProduct = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // From auth middleware

  try {
    // Validate input
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ msg: 'Invalid product ID or quantity' });
    }

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check stock
    if (product.quantity < quantity) {
      return res.status(400).json({ msg: 'Insufficient stock' });
    }

    // Update product quantity
    product.quantity -= quantity;
    await product.save();

    // Here you might want to create an order record, but for simplicity, we'll just return success
    res.status(200).json({ msg: 'Purchase successful', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export default purchaseProduct ;