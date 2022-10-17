const router = require('express').Router();
const { addComment,
     removeComment, 
    addReply,
    removeReply
    } = require('../../controllers/comment-controller');

//set up addComment () as POST
router
    .route('/:pizzaId').post(addComment);
    

//set up removeComment as DELETE
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);


//remove reply
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);
module.exports = router;