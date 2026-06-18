const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const adminOnly = require(
  "../middleware/adminMiddleware"
);

const {
  getDashboardStats,
  getAllUsers,
  getSingleUser,
  deleteUser,
  changeRole,
  getAllItemsAdmin,
  deleteItemAdmin,
  getRecentUsers,
  getRecentItems,
} = require(
  "../controllers/adminController"
);

// Dashboard

router.get(
  "/stats",
  protect,
  adminOnly,
  getDashboardStats
);

// Users

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.get(
  "/users/recent",
  protect,
  adminOnly,
  getRecentUsers
);

router.get(
  "/users/:id",
  protect,
  adminOnly,
  getSingleUser
);

router.put(
  "/users/:id/role",
  protect,
  adminOnly,
  changeRole
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

// Items

router.get(
  "/items",
  protect,
  adminOnly,
  getAllItemsAdmin
);

router.get(
  "/items/recent",
  protect,
  adminOnly,
  getRecentItems
);

router.delete(
  "/items/:id",
  protect,
  adminOnly,
  deleteItemAdmin
);

module.exports = router;