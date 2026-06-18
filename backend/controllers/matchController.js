const Match = require("../models/Match");
const Item = require("../models/Item");

const calculateScore = (
  lostItem,
  foundItem
) => {
  let score = 0;

  if (
    lostItem.category
      .toLowerCase()
      .trim() ===
    foundItem.category
      .toLowerCase()
      .trim()
  ) {
    score += 40;
  }

  const lostTitle =
    lostItem.title.toLowerCase();

  const foundTitle =
    foundItem.title.toLowerCase();

  const lostWords =
    lostTitle.split(" ");

  lostWords.forEach((word) => {
    if (
      foundTitle.includes(word)
    ) {
      score += 10;
    }
  });

  const lostDesc =
    lostItem.description.toLowerCase();

  const foundDesc =
    foundItem.description.toLowerCase();

  if (
    lostDesc.includes(
      foundItem.category.toLowerCase()
    )
  ) {
    score += 15;
  }

  if (
    foundDesc.includes(
      lostItem.category.toLowerCase()
    )
  ) {
    score += 15;
  }

  if (
    lostItem.location &&
    foundItem.location &&
    lostItem.location
      .toLowerCase()
      .trim() ===
      foundItem.location
        .toLowerCase()
        .trim()
  ) {
    score += 20;
  }

  return score;
};

exports.generateMatches =
  async (req, res) => {
    try {
      const items =
        await Item.find();

      const lostItems =
        items.filter(
          (i) =>
            i.status ===
            "lost"
        );

      const foundItems =
        items.filter(
          (i) =>
            i.status ===
            "found"
        );

      let matchesCreated =
        0;

      for (const lost of lostItems) {
        for (const found of foundItems) {
          const score =
            calculateScore(
              lost,
              found
            );

          if (score >= 50) {
            const exists =
              await Match.findOne({
                lostItemId:
                  lost._id,
                foundItemId:
                  found._id
              });

            if (!exists) {
              await Match.create({
                lostItemId:
                  lost._id,
                foundItemId:
                  found._id,
                score
              });

              matchesCreated++;
            }
          }
        }
      }

      res.json({
        success: true,
        matchesCreated
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.getMatches =
  async (req, res) => {
    try {
      const matches =
        await Match.find()
          .populate(
            "lostItemId"
          )
          .populate(
            "foundItemId"
          )
          .sort({
            score: -1
          });

      res.json(matches);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.getMatchesByItem =
  async (req, res) => {
    try {
      const matches =
        await Match.find({
          $or: [
            {
              lostItemId:
                req.params.id
            },
            {
              foundItemId:
                req.params.id
            }
          ]
        })
          .populate(
            "lostItemId"
          )
          .populate(
            "foundItemId"
          )
          .sort({
            score: -1
          });

      res.json(matches);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.markRecovered =
  async (req, res) => {
    try {
      const match =
        await Match.findById(
          req.params.id
        );

      if (!match) {
        return res
          .status(404)
          .json({
            message:
              "Match Not Found"
          });
      }

      match.status =
        "recovered";

      await match.save();

      await Item.findByIdAndUpdate(
        match.lostItemId,
        {
          status:
            "recovered"
        }
      );

      await Item.findByIdAndUpdate(
        match.foundItemId,
        {
          status:
            "recovered"
        }
      );

      res.json({
        message:
          "Item Recovered Successfully"
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.deleteMatch =
  async (req, res) => {
    try {
      await Match.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Match Deleted"
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };