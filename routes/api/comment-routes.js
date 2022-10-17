const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

//set up addComment () as POST
router
    .route('/:pizzaId').post(addComment);
    

//set up removeComment as DELETE
router
    .route('/:pizzaId/:commentId').delete(removeComment);


module.exports = router;