const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const post = require("../controllers/post.controllers");
const comment = require("../controllers/comment.controllers");
const like = require("../controllers/like.controllers");

router.get("/", auth, post.getAllPosts);
router.post("/", auth,  multer.array('content', 50), post.createPost);
router.put("/:postId", auth, multer.array('content', 50), post.modifyPost);
router.delete("/:postId", auth, post.deletePost);

router.get("/:postId", auth, comment.getAllComments);
router.post("/:postId", auth, comment.createComment);
router.put("/:commentId/comment", auth, comment.modifyComment);
router.delete("/:commentId/comment", auth, comment.deleteComment);

router.get("/:postId/likes", auth, like.getAllLikes);
// router.get("/:postId/like", auth, like.getOneLike);
router.post("/:postId/like", auth, like.likePost);

module.exports = router;