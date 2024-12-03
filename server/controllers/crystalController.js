const router = require('express').Router();
const crystalService = require('../services/crystalService');

router.post('/create', async (req, res) => {
    const crystalData = req.body;
    const userId = req.body.owner;

    try {
        const createdCrystal = await crystalService.create(userId, crystalData);
    
        res.status(200).send({ createdCrystal });
  
    } catch (error) {
        
        res.status(400).send({ message: error.message });
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const crystals = await crystalService.getAll();
    
        res.status(200).send({ crystals });
    } catch (error) {

        res.status(400).send({ message: error.message });
    }
    
});

router.get('/:crystalId/details', async (req, res) => {
    const crystalId = req.params.crystalId;
    const userId = req.user?._id;
    try {
        const crystal = await crystalService.getOneDetailed(crystalId);
        // const crystal = await crystalService.getOne(crystalId);

        // const isOwner = recipe.owner && recipe.owner._id == userId;
        // const isRecommended = recipe.recommendList.some(user => user._id == userId);
        // const recommendedCount = Number(recipe.recommendList.length);

        // res.render('recipes/details', { ...recipe, isOwner, isRecommended, recommendedCount });
        res.status(200).send({ crystal });
    }  catch (error) {

        res.status(400).send({ message: error.message });
    }
});

module.exports = router;