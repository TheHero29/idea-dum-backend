// Description: This file contains the routes for the user model.

const router = require("express").Router();
const userController = require("../controllers/userController");

//get all users
router.get("/", userController.getAllUsers); 

//get user by id
router.get("/:id", userController.getUserById); 

//delete user by id
router.delete("/:id", userController.deleteUserById);   

//update user by id
router.put("/:id", userController.updateUserById);  

//create user
router.post("/", userController.createUser);
  
module.exports = router;