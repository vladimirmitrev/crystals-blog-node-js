const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [3, 'Name should be at least 3 characters']
    },
    color: {
        type: String,
        required: [true, 'Color is required!'],
        minLength: [3, 'Color minimum length is 3 characters'],
        maxLength: [100, 'Color maximum length is 100 characters']
    },
    appearance: {
        type: String,
        required: [true, 'Appearance is required!'],
        minLength: [4, 'Appearance minimum length is 4 characters'],
    },
    rarity: {
        type: String,
        required: [true, 'Rarity is required!'],
        minLength: [3, 'Rarity minimum length is 3 characters'],
        maxLength: [128, 'Rarity maximum length is 128 characters']
    },
    source: {
        type: String,
        required: [true, 'Source is required!'],
        minLength: [3, 'Source minimum length is 3 characters'],
        maxLength: [128, 'Source maximum length is 128 characters']
    },
    healing: {
        type: String,
        required: [true, 'Healing is required!'],
        minLength: [6, 'Healing minimum length is 6 characters'],
        maxLength: [2048, 'Healing maximum length is 2048 characters']
    },    
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image must be a valid URL!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, 
{ timestamps: true}
);

const Crystal = mongoose.model('Crystal', crystalSchema);

module.exports = Crystal;
