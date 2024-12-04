const Comment = require('../models/Comment');
const User = require('../models/User');

exports.getAllComments = (crystal) => {

    const comments = Comment.find({ crystal }).populate('owner');

    return comments;
};

exports.create = async (userId, crystalId, text) => {

    const createdComment = await Comment.create({
        owner: userId,
        crystal: crystalId,
        text: text
    });

    await User.findByIdAndUpdate(userId, { $push: { createdComments: createdComment._id } });

    return createdComment;
};



