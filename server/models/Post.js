import mongoose from 'mongoose';



const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: { type: String, required: false},
    createdAt: { type: Date, default: Date.now},
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        content: { type: String, required: false},
        createdAt: { type: Date, default: Date.now},

    }],
})

export default mongoose.model("Post", postSchema);