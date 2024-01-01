const mongoose =require('mongoose')

const PostSchema = new mongoose.Schema({
    title :String,
    desc :String,
    file:String,
    email:String
})

const PostModel = mongoose.model('Post',PostSchema)
module.exports = PostModel;
