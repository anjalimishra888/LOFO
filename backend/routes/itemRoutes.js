const express = require("express");

const router =
  express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  createItem,
  getAllItems,
  searchItems,
  getSingleItem,
  updateItem,
  deleteItem,
  myItems
} = require(
  "../controllers/itemController"
);

router.get("/", getAllItems);

router.get(
  "/search",
  searchItems
);

router.get(
  "/my-items",
  protect,
  myItems
);

router.get(
  "/:id",
  getSingleItem
);

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

module.exports = router;