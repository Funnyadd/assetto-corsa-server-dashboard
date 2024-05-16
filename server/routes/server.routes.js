let router = require("express").Router();
const serverController = require("../controllers/server.controller");
const authService = require('../services/auth.service');

// Get all the information for each server instances
router.get("/", authService.authenticate, serverController.findAll)

// Get information per server instance
router.get("/:id", authService.authenticate, serverController.find)

// Create a new server instance
router.post("/add", authService.authenticate, serverController.add)

// Update a server instance
router.post("/edit", authService.authenticate, serverController.edit)

// Start a server instance
router.post("/start/:id", authService.authenticate, serverController.start)

// Stop a server instance
router.post("/stop/:id", authService.authenticate, serverController.stop)

// Stop all the server instances
router.post("/stopAll", authService.authenticate, serverController.stopAll)

module.exports = router