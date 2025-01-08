const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const crystalService = require('../services/crystalService');

router.post('/create', isAuth, async (req, res) => {
    const crystalData = req.body;
    const userId = req.body.owner;

    try {
        const createdCrystal = await crystalService.create(userId, crystalData);
    
        res.status(200).send({ createdCrystal });
  
    } catch (error) {
        
        res.status(404).send({ message: error.message });
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const crystals = await crystalService.getAll();
    
        res.status(200).send({ crystals });
    } catch (error) {

        res.status(404).send({ message: error.message });
    }
    
});

router.get('/:crystalId/details', async (req, res) => {
    const crystalId = req.params.crystalId;
    const userId = req.user?._id;
    try {
        const crystal = await crystalService.getOneDetailed(crystalId);
        // const crystal = await crystalService.getOne(crystalId);

        // const isOwner = crystal.owner && recipe.owner._id == userId;
        // const isRecommended = crystal.recommendList.some(user => user._id == userId);
        // const recommendedCount = Number(crystal.recommendList.length);

        // res.render('crystals/details', { ...crystal, isOwner, isRecommended, recommendedCount });
        res.status(200).send({ crystal });
    }  catch (error) {

        res.status(404).send({ message: error.message });
    }
});

router.put('/:crystalId/edit', isAuth, async (req, res) => {
    const crystalData = req.body;
    const crystalId = req.body._id;

    try {
        const editedCrystal = await crystalService.edit(crystalId, crystalData);
    
        res.status(200).send({ editedCrystal });
  
    } catch (error) {
        
        res.status(404).send({ message: error.message });
    }
});

router.delete('/:crystalId', isAuth, async (req, res) => {
    const crystalId = req.params.crystalId;
    try {
        const deletedCrystal = await crystalService.delete(crystalId);
    
        res.status(200).send({ deletedCrystal });
  
    } catch (error) {
        
        res.status(404).send({ message: error.message });
    }
})

module.exports = router;