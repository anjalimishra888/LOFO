const express = require("express");

const router =
  express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  sendMessage,
  getConversation,
  getMyChats,
  markAsRead
} = require(
  "../controllers/messageController"
);

router.post(
  "/send",
  protect,
  sendMessage
);

router.get(
  "/my-chats",
  protect,
  getMyChats
);

router.get(
  "/conversation/:itemId/:userId",
  protect,
  getConversation
);

router.put(
  "/read/:itemId/:userId",
  protect,
  markAsRead
);

module.exports = router;