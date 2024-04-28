const express = require("express");
const router = express.Router();

const { localFileUpload, imageUpload, videoUpload, reduceImageUpload } = require("../controllers/fileUpload");

router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/localFileUpload", localFileUpload);
router.post("/reduceImageUpload", reduceImageUpload)

module.exports = router;
