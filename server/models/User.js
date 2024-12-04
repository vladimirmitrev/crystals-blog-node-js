const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name minimum length is 2 characters'],
        maxLength: [30, 'Name maximum length is 30 characters'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required!'],
        minLength: [4, 'Email should be at least 4 characters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [6, 'Password should be at least 6 characters']
    },
    phone: {
        type: String,
        required: true
    },
    createdCrystals: [{
        type: mongoose.Types.ObjectId,
        ref: 'Crystal',
    }],
    createdComments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
    }],
    likedPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Like',
    }],
}, {
    collation: {
        locale: 'en',
        strength: 2
    }, 
    timestamps: true
}
);

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

// userSchema.virtual('fullNameAndEmail').get(function () {
//     return this.name + ' ' + this.email;
// })

const User = mongoose.model('User', userSchema);

module.exports = User;
