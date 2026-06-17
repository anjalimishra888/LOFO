const Item = require("../models/Item");

exports.createItem =
  async (req, res) => {
    try {
      const item =
        await Item.create({
          title:
            req.body.title,
          description:
            req.body.description,
          category:
            req.body.category,
          status:
            req.body.status,
          location:
            req.body.location,
          image:
            req.file?.filename,
          userId:
            req.user._id
        });

      res.status(201).json(
        item
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.getAllItems =
  async (req, res) => {
    try {
      const filter = {};

      if (
        req.query.status
      ) {
        filter.status =
          req.query.status;
      }

      if (
        req.query.category
      ) {
        filter.category =
          req.query.category;
      }

      const items =
        await Item.find(
          filter
        )
          .populate(
            "userId",
            "name email"
          )
          .sort({
            createdAt: -1
          });

      res.json(items);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.searchItems =
  async (req, res) => {
    try {
      const keyword =
        req.query.keyword ||
        "";

      const items =
        await Item.find({
          title: {
            $regex:
              keyword,
            $options: "i"
          }
        });

      res.json(items);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.getSingleItem =
  async (req, res) => {
    try {
      const item =
        await Item.findById(
          req.params.id
        ).populate(
          "userId",
          "name email"
        );

      if (!item) {
        return res
          .status(404)
          .json({
            message:
              "Item Not Found"
          });
      }

      res.json(item);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.updateItem =
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
              "Item Not Found"
          });
      }

      if (
        item.userId.toString() !==
        req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({
            message:
              "Unauthorized"
          });
      }

      item.title =
        req.body.title ||
        item.title;

      item.description =
        req.body.description ||
        item.description;

      item.category =
        req.body.category ||
        item.category;

      item.status =
        req.body.status ||
        item.status;

      item.location =
        req.body.location ||
        item.location;

      if (req.file) {
        item.image =
          req.file.filename;
      }

      const updated =
        await item.save();

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.deleteItem =
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
              "Item Not Found"
          });
      }

      await item.deleteOne();

      res.json({
        message:
          "Item Deleted"
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

exports.myItems =
  async (req, res) => {
    try {
      const items =
        await Item.find({
          userId:
            req.user._id
        }).sort({
          createdAt: -1
        });

      res.json(items);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };