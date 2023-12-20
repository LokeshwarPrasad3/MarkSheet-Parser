const multer = require("multer")


// multer used
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/marksheet")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage })
module.exports = { upload }