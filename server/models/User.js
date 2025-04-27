import mongoose from 'mongoose';

// Creating Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true, unique: true},
    role: { type: String, enum: ['farmer', 'buyer'], require: true},
    createdAt: { type: Date, default: Date.now},
});

// Creating model and exporting the model

export default mongoose.model("User", userSchema);

