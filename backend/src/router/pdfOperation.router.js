

const express = require("express");
const { extractPDFData, accessAllStudentMarksheetDetails } = require("../controllers/pdfExtracter.controllers.js");
const router = express.Router();
const { upload } = require("../middleware/multer.middleware.js")

// routes for extract pdf data
router.route("/extract-pdf").post(
    upload.single('file'),
    extractPDFData
);

// router access details of marksheet uploaded
router.route("/all-student-marksheet-details").get(accessAllStudentMarksheetDetails)


module.exports = router;

