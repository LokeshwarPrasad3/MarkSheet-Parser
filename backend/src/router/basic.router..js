

const express = require("express");
const { convertPDFToText } = require("../controllers/pdfWork");
const router = express.Router();
const { upload } = require("../middleware/multer.middleware.js")

router.route("/getpdf").post(
    upload.single('file'),
    convertPDFToText
);


module.exports = router;

