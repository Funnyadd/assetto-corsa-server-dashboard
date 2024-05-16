let router = require("express").Router();
const whitelistController = require("../controllers/whitelist.controller");
const authService = require('../services/auth.service');

// Add one or more username to the whitelist
router.post("/", authService.authenticate, whitelistController.add)

// Fetch all usernames from the whitelist
router.get("/", authService.authenticate, whitelistController.findAll)

// Delete a username from the whitelist
router.delete("/delete/:username", authService.authenticate, whitelistController.delete)

module.exports = router