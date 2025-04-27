import Post from '../models/Post.js';


const makePost = async(req, res) => {
    const { content } = req.body;

    try{
        const post = new Post({ user: req.user.id, content});
        await post.save();
        res.json(post);
    }catch(err){
    }
    res.status(500).json({ error: err.message})
}

const makeComment = async(req, res) => {
    const [ content] = req.body;

    try{
        const post = await Post.findById(req.params.id);
        post.comments.push({ user: req.user.id, content });
        await post.save();
        res.json(post)
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
};

// Get posts

const getPost = async (req, res) => {
    try{
        const posts = await Post.find().populate('user', 'name').populate('comments.users', 'name');
        res.json(posts);
    }catch(err){

    }
};

export { makePost, getPost, makeComment};