// Description: This file contains the routes for the post model.

const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/auth");

//get all posts
router.get("/", postController.getAllPosts); 

//get post by id
router.get("/:id", postController.getPostById); 

//delete post by id
router.delete("/:id", postController.deletePostById);   

//update post by id
router.put("/:id", postController.updatePostById);  
router.put("/:id/upvote", authMiddleware,postController.upvotePostById);  
router.put("/:id/downvote", authMiddleware,postController.downvotePostById);  

//create post
router.post("/",authMiddleware,postController.createPost);
  
module.exports = router;