const Crystal = require('../models/Crystal');
const User = require('../models/User');

exports.create = async (userId, crystalData) => {

    const createdCrystal = await Crystal.create({
        owner: userId,
        ...crystalData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdCrystals: createdCrystal._id } })
    .then(crystals => console.log(crystals))
    .catch(err => console.log(err));

    return createdCrystal;
};

exports.getAll = () => Crystal.find();

exports.getLatest = () => {

    const latestCrystals = Crystal.find().sort({createdAt: -1}).limit(5);

    return latestCrystals;
}

exports.getOne = (crystalId) => Crystal.findById(crystalId);

exports.getOneDetailed = (crystalId) => this.getOne(crystalId).populate('owner');

exports.edit = (crystalId, crystalData) => Crystal.findByIdAndUpdate(crystalId, crystalData,{ runValidators: true});

exports.delete = (crystalId) => Crystal.findByIdAndDelete(crystalId);

exports.search = (name, healing) => {
    let query = {};
  
    if(name) {
      query.name = new RegExp(name, 'i');
    }
    if(healing) {
        query.healing = new RegExp(healing, 'i');
      }

    
    return Crystal.find(query);
  };