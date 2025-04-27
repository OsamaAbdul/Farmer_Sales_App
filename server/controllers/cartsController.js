import Cart from '../models/Carts.js';
import Products from '../models/Products.js';

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ msg: 'Invalid product ID or quantity' });
    }

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ msg: 'Insufficient product quantity' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (newQuantity > product.quantity) {
        return res.status(400).json({ msg: 'Total quantity exceeds available stock' });
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate('items.product', 'name price');
    res.status(200).json({ cart }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price');
    if (!cart) {
      return res.status(200).json({ cart: { items: [] } });
    }

    cart.items = cart.items.filter((item) => item.product !== null);
    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export { addToCart, getCart };