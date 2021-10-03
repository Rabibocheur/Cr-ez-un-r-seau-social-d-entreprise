const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const user = require("../controllers/user");

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/:userId", auth, user.getUserProfile);
router.put("/:userId", auth, multer.fields([{name: 'avatar'}, {name: 'couverture'}]), user.modifyProfile);

module.exports = router;