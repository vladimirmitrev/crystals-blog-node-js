// const recipeService = require('../services/recipeService');

// async function isPostOwner(req, res, next) {
//     const recipe = await recipeService.getOne(req.params.recipeId).lean();
  
//     if (recipe.owner != req.user?._id) {
//       return res.redirect(`/recipes/${req.params.recipeId}/details`);
//     } 

//     req.recipe = recipe;
  
//     next();
//   }
  
//   exports.isPostOwner = isPostOwner;