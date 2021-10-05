const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const post = require("../controllers/post");

router.post("/", auth, multer.single('content'), post.toPost);
router.get("/", auth, post.getAllPosts);

module.exports = router;