const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const notification = require("../controllers/notification.controllers");

router.get("/", auth, notification.getNotifications);
router.post("/", auth, notification.MarkAsRead);

module.exports = router;