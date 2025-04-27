import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Link to product
  type: { type: String, enum: ['product', 'supply', 'grant'], required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);