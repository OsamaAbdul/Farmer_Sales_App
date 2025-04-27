import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
      quantity: { type: Number, min: 1, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Cart', cartSchema);