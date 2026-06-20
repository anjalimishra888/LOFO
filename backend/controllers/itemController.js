const Item = require("../models/Item");

/* =========================
   CREATE ITEM
========================= */
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      location: req.body.location,
      itemType: req.body.itemType || req.body.status,
      itemStatus: req.body.itemStatus,
      image: req.file?.filename,
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   GET ALL ITEMS
========================= */
exports.getAllItems = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.itemType) {
      filter.itemType = req.query.itemType;
    }

    if (req.query.itemStatus) {
      filter.itemStatus = req.query.itemStatus;
    }

    let items = await Item.find(filter)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   SEARCH ITEMS
========================= */
exports.searchItems = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    let items = await Item.find({
      title: {
        $regex: keyword,
        $options: "i"
      }
    })
      .lean();

    res.json({
      success: true,
      items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   GET SINGLE ITEM
========================= */
exports.getSingleItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("userId", "name email");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item Not Found"
      });
    }

    res.json({
      success: true,
      item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   UPDATE ITEM
========================= */
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item Not Found"
      });
    }

    // ownership check
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    item.title = req.body.title || item.title;
    item.description = req.body.description || item.description;
    item.category = req.body.category || item.category;
    item.status = req.body.status || item.status;
    item.location = req.body.location || item.location;
    item.itemType = req.body.itemType || req.body.status || item.itemType;
    item.itemStatus = req.body.itemStatus || item.itemStatus;

    if (req.file) {
      item.image = req.file.filename;
    }

    const updated = await item.save();

    res.json({
      success: true,
      item: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   DELETE ITEM
========================= */
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item Not Found"
      });
    }

    // ownership check (IMPORTANT FIX)
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    await item.deleteOne();

    res.json({
      success: true,
      message: "Item Deleted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   MY ITEMS
========================= */
exports.myItems = async (req, res) => {
  try {
    console.log("Logged User:", req.user._id);

    const items = await Item.find({
      userId: req.user._id,
    });

    console.log("Items:", items);

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   CONTACT OWNER
========================= */
exports.contactOwner = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("userId", "name email");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.json({
      success: true,
      owner: item.userId,
      item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};