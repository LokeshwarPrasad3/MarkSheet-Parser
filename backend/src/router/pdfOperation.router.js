

const express = require("express");
const { extractPDFData } = require("../controllers/pdfExtracter.controllers.js");
const router = express.Router();
const { upload } = require("../middleware/multer.middleware.js")

// routes for extract pdf data
router.route("/extract-pdf").post(
    upload.single('file'),
    extractPDFData
);

console.log("HELLOW");


module.exports = router;

