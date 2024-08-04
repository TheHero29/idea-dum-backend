// Description: This file contains the routes for the user model.

const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

//get all users
router.get("/", userController.getAllUsers); 

router.get("/get-current-user",authMiddleware,userController.getCurrentUser)

//get user by id
// router.get("/:id", userController.getUserById); 

//delete user by id
router.delete("/:id", userController.deleteUserById);   

//update user by id
router.put("/:id", userController.updateUserById);  

//login user
router.post("/login", userController.loginUser);

//register user
router.post("/register", userController.createUser);

//get current user
// router.get("/get-current-user",authMiddleware,userController.getCurrentUser);
module.exports = router;