const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createItem,
  getAllItems,
  searchItems,
  getSingleItem,
  updateItem,
  deleteItem,
  myItems,
  contactOwner,
} = require("../controllers/itemController");


// =======================
// PUBLIC ROUTES
// =======================

router.get("/", getAllItems);

router.get("/search", searchItems);


// =======================
// PROTECTED ROUTES
// =======================

router.get("/my-items", protect, myItems);

router.post(
  "/create",
  protect,
  upload.single("image"),
  createItem
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateItem
);

router.delete(
  "/:id",
  protect,
  deleteItem
);

router.get(
  "/contact/:id",
  protect,
  contactOwner
);


router.get("/:id", getSingleItem);

module.exports = router;