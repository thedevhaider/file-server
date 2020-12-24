const express = require("express");
const passport = require("passport");
const S3Util = require("../../utils/S3Util");
const keys = require("../../config/keys");
const router = express.Router();

// Load the file model
const File = require("../../models/File.js");

// @routes     GET api/files/healthcheck
// @desc       Tests files routes
// @access     Public
router.get("/healthcheck", (req, res) =>
  res.json({ file: "Files route Working" })
);

// @routes     POST api/files/
// @desc       Create and Upload File
// @access     Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Instantiate S3 Object
    let s3 = new S3Util();

    // Upload image to s3 and set the url
    s3.upload(s3.base64ToFile(req.body.file), keys.uploadRoot, req.user._id)
      .then((url) => {
        // Create File payload
        const filePayload = {
          url,
          user: req.user,
        };

        // Create Model object
        const newFile = new File(filePayload);

        // Save the File into database
        newFile
          .save()
          .then((file) => res.json(file))
          .catch((err) => {
            console.log(err);
            res
              .status(400)
              .json({ error: "Error while creating database entry" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({});
      });
  }
);

// @routes     GET api/files/
// @desc       List Uploaded files
// @access     Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Offsets for Pagination
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    // Query Files
    File.find({ user: req.user }, {}, { skip: skip, limit: limit })
      .sort("-createdAt")
      .then((files) => res.json(files))
      .catch((err) =>
        res.status(400).json({ error: "Could not able to list Files" })
      );
  }
);

// @route   DELETE api/files/:file_id
// @desc    Delete File
// @access  Private
router.delete(
  "/:file_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    File.findById({ _id: req.params.file_id })
      .then((file) => {
        // Check if the logged in user is the owner of file
        if (file.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ error: "You are not authorized to delete this file" });
        }

        // Instantiate S3 Object
        let s3 = new S3Util();

        // Deleting file from S3 Bucket
        s3.delete(file.url, req.user._id)
          .then((data) => {
            // Delete file from database
            file.remove();
            res.json({
              message: `File with id '${req.params.file_id}' successfuly deleted`,
            });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(400)
              .json({ error: "Error occured while deleting file" });
          });
      })
      .catch((err) =>
        res.status(400).json({
          error: `File with id '${req.params.file_id}' does not exists`,
        })
      );
  }
);

module.exports = router;
