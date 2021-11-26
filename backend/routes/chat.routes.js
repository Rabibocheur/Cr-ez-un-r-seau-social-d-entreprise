const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const chat = require("../controllers/chat.controllers");

router.get("/", auth, chat.getAllMessage);

module.exports = router;