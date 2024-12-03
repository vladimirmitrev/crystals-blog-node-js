const Crystal = require('../models/Crystal');
const User = require('../models/User');

exports.create = async (userId, crystalData) => {

    const createdCrystal = await Crystal.create({
        owner: userId,
        ...crystalData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdCrystals: createdCrystal._id } });

    return createdCrystal;
};

exports.getAll = () => Crystal.find();

exports.getOne = (crystalId) => Crystal.findById(crystalId);

exports.getOneDetailed = (crystalId) => this.getOne(crystalId).populate('owner');
   

