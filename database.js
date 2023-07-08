import mongoose from 'mongoose';
import secrets from './secrets.js';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);

mongoose.connect(secrets.mongoDbURI).then(() => {
    console.log("Connected to mongoDB");
}).catch((error) => {
    console.error("Error connecting to mongoDB: ", error);
});

export default Post;
