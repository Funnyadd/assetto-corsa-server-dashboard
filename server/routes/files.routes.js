let router = require("express").Router();
const filesController = require("../controllers/files.controller");
const authService = require('../services/auth.service');

// Download a zip file containing a track or a car
router.get("/download/:id", authService.authenticate, filesController.download);

// Upload a zip file of a track or a car
router.post("/upload", authService.authenticate, filesController.upload);

module.exports = router;