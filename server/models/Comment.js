const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     require: true
    // },
    text: {
        type: String,
        require: true
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