// Description: This file contains the routes for the post model.

const router = require("express").Router();
const postController = require("../controllers/postController");

//get all posts
router.get("/", postController.getAllPosts); 

//get post by id
router.get("/:id", postController.getPostById); 

//delete post by id
router.delete("/:id", postController.deletePostById);   

//update post by id
router.put("/:id", postController.updatePostById);  

//create post
router.post("/", postController.createPost);
  
module.exports = router;