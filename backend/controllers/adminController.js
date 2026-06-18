const User = require("../models/User");
const Item = require("../models/Item");

// ============================
// DASHBOARD STATS
// ============================

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalItems = await Item.countDocuments();

    const totalLostItems =
      await Item.countDocuments({
        status: "lost",
      });

    const totalFoundItems =
      await Item.countDocuments({
        status: "found",
      });

    const latestItems = await Item.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalItems,
      totalLostItems,
      totalFoundItems,
      latestItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// GET ALL USERS
// ============================

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// GET SINGLE USER
// ============================

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// DELETE USER
// ============================

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    await Item.deleteMany({
      userId: user._id,
    });

    await user.deleteOne();

    res.json({
      message:
        "User And Related Items Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// CHANGE ROLE
// ============================

exports.changeRole = async (
  req,
  res
) => {
  try {
    const { role } = req.body;

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    user.role = role;

    await user.save();

    res.json({
      message: "Role Updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// GET ALL ITEMS
// ============================

exports.getAllItemsAdmin =
  async (req, res) => {
    try {
      const items = await Item.find()
        .populate(
          "userId",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

      res.json(items);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// ============================
// DELETE ITEM
// ============================

exports.deleteItemAdmin =
  async (req, res) => {
    try {
      const item =
        await Item.findById(
          req.params.id
        );

      if (!item) {
        return res
          .status(404)
          .json({
            message:
              "Item Not Found",
          });
      }

      await item.deleteOne();

      res.json({
        message:
          "Item Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ============================
// RECENT USERS
// ============================

exports.getRecentUsers =
  async (req, res) => {
    try {
      const users =
        await User.find()
          .select("-password")
          .sort({
            createdAt: -1,
          })
          .limit(10);

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ============================
// RECENT ITEMS
// ============================

exports.getRecentItems =
  async (req, res) => {
    try {
      const items =
        await Item.find()
          .populate(
            "userId",
            "name email"
          )
          .sort({
            createdAt: -1,
          })
          .limit(10);

      res.json(items);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };