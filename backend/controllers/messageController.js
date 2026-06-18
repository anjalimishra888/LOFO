const Message = require("../models/Message");
const Item = require("../models/Item");
const User = require("../models/User");

exports.sendMessage = async (
  req,
  res
) => {
  try {
    const { receiverId, itemId, message } =
      req.body;

    const item =
      await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    const receiver =
      await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found"
      });
    }

    const newMessage =
      await Message.create({
        senderId: req.user._id,
        receiverId,
        itemId,
        message
      });

    const populated =
      await Message.findById(
        newMessage._id
      )
        .populate(
          "senderId",
          "name email"
        )
        .populate(
          "receiverId",
          "name email"
        )
        .populate(
          "itemId",
          "title image status"
        );

    res.status(201).json(
      populated
    );
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getConversation =
  async (req, res) => {
    try {
      const { itemId, userId } =
        req.params;

      const messages =
        await Message.find({
          itemId,
          $or: [
            {
              senderId:
                req.user._id,
              receiverId: userId
            },
            {
              senderId: userId,
              receiverId:
                req.user._id
            }
          ]
        })
          .populate(
            "senderId",
            "name email"
          )
          .populate(
            "receiverId",
            "name email"
          )
          .sort({
            createdAt: 1
          });

      res.json(messages);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

exports.getMyChats =
  async (req, res) => {
    try {
      const chats =
        await Message.find({
          $or: [
            {
              senderId:
                req.user._id
            },
            {
              receiverId:
                req.user._id
            }
          ]
        })
          .populate(
            "senderId",
            "name"
          )
          .populate(
            "receiverId",
            "name"
          )
          .populate(
            "itemId",
            "title image"
          )
          .sort({
            updatedAt: -1
          });

      const uniqueChats =
        [];

      const seen =
        new Set();

      chats.forEach((chat) => {
        const otherUser =
          chat.senderId._id.toString() ===
          req.user._id.toString()
            ? chat.receiverId._id.toString()
            : chat.senderId._id.toString();

        const key =
          `${otherUser}-${chat.itemId._id}`;

        if (
          !seen.has(key)
        ) {
          seen.add(key);
          uniqueChats.push(chat);
        }
      });

      res.json(
        uniqueChats
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.markAsRead =
  async (req, res) => {
    try {
      await Message.updateMany(
        {
          receiverId:
            req.user._id,
          senderId:
            req.params.userId,
          itemId:
            req.params.itemId
        },
        {
          isRead: true
        }
      );

      res.json({
        message:
          "Messages marked as read"
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };