import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    seller: { type: mongoose.Types.ObjectId, ref: 'User', required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: { type: Number, required: true},
    category: { type: String, enum: ['crops', 'seeds', 'fertilizers', 'herbicides'], required: true},
    status: { type: String, enum: ['available', 'sold'], default: 'available'},
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);