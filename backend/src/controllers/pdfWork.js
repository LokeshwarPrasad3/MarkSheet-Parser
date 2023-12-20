const { printSubjectMarks } = require("../utils/converter");


const convertPDFToText = async (req, res, next) => {

    try {
        // const filess = req.file;
        const filePath = req.file?.path; // we need only path
        const fileType = req.file?.mimetype;
        console.log(filePath)
        console.log(fileType)
        if (fileType !== "application/pdf" || !filePath) {
            res.status(400).json({
                success: false,
                message: "PDF File not found"
            });
            return;
        }

        const subjectMarksArray = await printSubjectMarks(filePath);

       
        res.status(200).json({
            success: subjectMarksArray.length===0?false:true,
            message: "Successfully Marks Extracted!!",
            subjectMarksArray: subjectMarksArray
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid Marksheet Format!!",
        })
    }
}


module.exports = { convertPDFToText }