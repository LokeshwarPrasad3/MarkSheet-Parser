const { printSubjectMarks, extractTextDetails } = require("../utils/converter");


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
        let details = await extractTextDetails(filePath);

        // INSTITUTE NAME: name+1, father(10), sem(3), btech cs(2)
        // roll(4), session(11), type(12), enroll(13), result(15), spi(14), 

        const getBaseIndex = details?.findIndex((element) => element.split(" ").join("") === "INSTITUTENAME:");

        const university = "CHHATTISGARH SWAMI VIVEKANAND TECHNICAL UNIVERSITY, BHILAI";
        console.log(details[getBaseIndex + 1]); // name
        console.log(details[getBaseIndex + 10]);  // father
        console.log(details[getBaseIndex + 3].slice(0, 1)); // sem
        // let CourseBranch = details[getBaseIndex + 2].split(" ");
        // console.log(CourseBranch[0] + CourseBranch[1]); // course btech
        // console.log(CourseBranch.slice(2, CourseBranch.length).join(" ")); // branch
        console.log(details[getBaseIndex + 4]); // rollno
        console.log(details[getBaseIndex + 11]); // session
        console.log(details[getBaseIndex + 12]); // type
        console.log(details[getBaseIndex + 13]); // enrollment
        console.log(details[getBaseIndex + 15].split(" ")[2]); // result
        console.log(details[getBaseIndex + 14].slice(details[getBaseIndex + 14].length - 3, details[getBaseIndex + 14].length)); // total-marks


        const sname = details[getBaseIndex + 1]; // name
        const fname = details[getBaseIndex + 10];  // father
        const sem = details[getBaseIndex + 3].slice(0, 1); // sem
        let CourseBranch = details[getBaseIndex + 2].split(" ");
        const course = CourseBranch[0] + CourseBranch[1]; // course btech
        const branch = CourseBranch.slice(2, CourseBranch.length).join(" "); // branch
        const roll = details[getBaseIndex + 4]; // rollno
        const session = details[getBaseIndex + 11]; // session
        const type = details[getBaseIndex + 12]; // type
        const enroll = details[getBaseIndex + 13]; // enrollment
        const result = details[getBaseIndex + 15].split(" ")[2]; // result
        const totalMarks = details[getBaseIndex + 14].slice(details[getBaseIndex + 14].length - 3, details[getBaseIndex + 14].length); // total-marks

        details = {
            sname,fname,sem,course,branch,roll,session,type,enroll,result,totalMarks
        }

        res.status(200).json({
            success: subjectMarksArray.length === 0 ? false : true,
            message: "Successfully Marks Extracted!!",
            subjectMarksArray: subjectMarksArray,
            details: details,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Invalid Marksheet Format!!",
        })
    }
}


module.exports = { convertPDFToText }