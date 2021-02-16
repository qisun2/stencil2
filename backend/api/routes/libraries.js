const express = require("express");
const router = express.Router();

// require the librariesController
const librariesController = require("../controllers/librariesController");

// GET
// retrieve all libraries
router.get("/:token&:uid", librariesController.getAllLibraryMetaInfo);
router.get("/dbid/:dbid&:token&:uid", librariesController.queryLibraryDataById);


// POST
// create one new library
router.post("/", librariesController.createNewLibrary);


// export the router
module.exports = router;
