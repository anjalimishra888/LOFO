const express = require("express");

const router =
  express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  generateMatches,
  getMatches,
  getMatchesByItem,
  markRecovered,
  deleteMatch
} = require(
  "../controllers/matchController"
);

router.post(
  "/generate",
  protect,
  generateMatches
);

router.get(
  "/",
  protect,
  getMatches
);

router.get(
  "/item/:id",
  protect,
  getMatchesByItem
);

router.put(
  "/recover/:id",
  protect,
  markRecovered
);

router.delete(
  "/:id",
  protect,
  deleteMatch
);

module.exports = router;