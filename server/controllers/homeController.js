const router = require('express').Router();
const crystalService = require('../services/crystalService'); 

router.get('/', async (req, res) => {

    try {
        const latestCrystals = await crystalService.getLatest();
    
        res.status(200).send({ latestCrystals });
    } catch (error) {

        res.status(400).send({ message: error.message });
    }
});

router.get('/search', async (req, res) => {
  const { name, healing } = req.query;
  
  try {
    const crystals = await crystalService.search(name, healing);

        res.status(200).send({ crystals });
    } catch (error) {

        res.status(400).send({ message: error.message });
    }

});

module.exports = router;
