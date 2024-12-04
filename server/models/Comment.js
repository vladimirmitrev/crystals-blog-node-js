const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Comment is required!'],
        minLength: [6, 'Comment minimum length is 6 characters'],
        maxLength: [256, 'Comment maximum length is 256 characters']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    crystal: {
        type: mongoose.Types.ObjectId,
        ref: 'Crystal'
    }
});

commentSchema.set('timestamps', true);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;