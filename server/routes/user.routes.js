let router = require("express").Router();
const userController = require("../controllers/user.controller");
const authService = require('../services/auth.service');

// Create new User
router.post("/add", authService.authenticate, userController.create);

// Fetch all users
router.get("/", authService.authenticate, userController.findAll);

// Fetch one user
router.get("/:id", authService.authenticate, userController.find);

// Sends users modification 
router.put(`/modify/:email`, authService.authenticate, userController.modifyUser);

// Delete a user
router.delete("/delete/:email", authService.authenticate, userController.deleteUser);

module.exports = router;