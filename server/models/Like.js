const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    isLiked: {
        type: Boolean,   
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

LikeSchema.set('timestamps', true);

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;