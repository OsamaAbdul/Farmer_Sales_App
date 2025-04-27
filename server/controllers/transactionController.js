import express from 'express';
import Transaction from '../models/Transaction.js';



const purchase = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
      if (req.user.role !== 'buyer') return res.status(403).json({ msg: 'Only buyers can purchase' });
      const product = await Product.findById(productId);
      if (!product || product.status !== 'available') return res.status(404).json({ msg: 'Product not available' });
      if (product.quantity < quantity) return res.status(400).json({ msg: 'Insufficient quantity' });
  
      const transaction = new Transaction({
        seller: product.seller,
        buyer: req.user.id,
        product: product._id,
        type: 'product',
        item: product.name,
        quantity,
        price: product.price * quantity,
      });
      await transaction.save();
  
      // Update product quantity or status
      product.quantity -= quantity;
      if (product.quantity === 0) product.status = 'sold';
      await product.save();
  
      res.json(transaction);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  

const getTransactions = async (req, res) => {
    try{
        const transactions = await Transaction.find({
            $or: [
                {seller: req.user.id},
                { buyer: req.user.id}
            ],
        }).populate('seller', 'name').populate('buyer', 'name');

        res.json(transactions);
    }catch(err){
        res.status(500).json({ error: err.message })
    }
}


export { purchase, getTransactions}