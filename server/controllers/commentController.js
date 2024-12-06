const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const commentService = require('../services/commentService');

router.get('/:crystalId', async (req, res) => {
    const crystalId = req.params.crystalId;
    // const userId = req.user?._id;
    try {
        const comments = await commentService.getAllComments(crystalId);
    
        res.status(200).send({ comments });
    }  catch (error) {

        res.status(400).send({ message: error.message });
    }
});

router.post('/create', isAuth,async (req, res) => {
    const commentData = req.body;
    const userId = req.body.owner;
    const crystalId = req.body.crystal;
    const text = req.body.text;

    try {
        const createdComment = await commentService.create(userId, crystalId, text);
    
        res.status(200).send({ createdComment });
  
    } catch (error) {
        
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;