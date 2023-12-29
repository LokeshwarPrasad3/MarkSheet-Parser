const { extractSubjectMarks, extractStudentDetails } = require("../utils/extractors");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const StudentModel = require("../models/student.model.js")


const extractPDFData = async (req, res) => {
    console.log("HIted1")
    try {
        // const files = req.file;
        const filePath = req.file?.path;
        const fileType = req.file?.mimetype;
        // console.log(filePath)
        // console.log(fileType)
        if (fileType !== "application/pdf" || !filePath) {
            throw new ApiError(400, "PDF file not found")
        }

        const extractedTableSubjectMarks = await extractSubjectMarks(filePath);
        let extractedStudentDetails = await extractStudentDetails(filePath);
        console.log(typeof extractedTableSubjectMarks)
        console.log(typeof extractedStudentDetails)
        const getStartingDetailsBeforeIndex = extractedStudentDetails?.findIndex((element) => element.split(" ").join("") === "INSTITUTENAME:");


        // --------------------------------------------------------------------------- 

        const university = "CHHATTISGARH SWAMI VIVEKANAND TECHNICAL UNIVERSITY, BHILAI";
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 1]); // name
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 10]);  // father
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 3].slice(0, 1)); // semester
        // let CourseBranch = extractedStudentDetails[getStartingDetailsBeforeIndex + 2].split(" ");
        // console.log(CourseBranch[0] + CourseBranch[1]); // course btech
        // console.log(CourseBranch.slice(2, CourseBranch.length).join(" ")); // branch
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 4]); // rollno
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 5]); // college
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 11]); // session
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 12]); // type
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 13]); // enrollmentment
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 15].split(" ")[2]); // result
        console.log(extractedStudentDetails[getStartingDetailsBeforeIndex + 14].slice(extractedStudentDetails[getStartingDetailsBeforeIndex + 14].length - 3, extractedStudentDetails[getStartingDetailsBeforeIndex + 14].length)); // total-marks
        // ------------------------------------------------------------------------------------ 

        const studentName = extractedStudentDetails[getStartingDetailsBeforeIndex + 1]; // name
        const fathersName = extractedStudentDetails[getStartingDetailsBeforeIndex + 10];  // father
        const semester = extractedStudentDetails[getStartingDetailsBeforeIndex + 3].slice(0, 1); // semester
        const CourseBranch = extractedStudentDetails[getStartingDetailsBeforeIndex + 2].split(" ");
        const course = CourseBranch[0] + CourseBranch[1]; // course btech
        const branch = CourseBranch.slice(2, CourseBranch.length).join(" "); // branch
        const rollNumber = extractedStudentDetails[getStartingDetailsBeforeIndex + 4]; // rollno
        const college = extractedStudentDetails[getStartingDetailsBeforeIndex + 5]; // college
        const examSession = extractedStudentDetails[getStartingDetailsBeforeIndex + 11]; // session
        const type = extractedStudentDetails[getStartingDetailsBeforeIndex + 12]; // type
        const enrollment = extractedStudentDetails[getStartingDetailsBeforeIndex + 13]; // enrollmentment
        const result = extractedStudentDetails[getStartingDetailsBeforeIndex + 15].split(" ")[2]; // result
        const totalMarks = extractedStudentDetails[getStartingDetailsBeforeIndex + 14].slice(extractedStudentDetails[getStartingDetailsBeforeIndex + 14].length - 3, extractedStudentDetails[getStartingDetailsBeforeIndex + 14].length); // total-marks
        const percent = totalMarks / 10;
        console.log(percent)

        extractedStudentDetails = {
            studentName, fathersName, semester, course, branch, rollNumber, examSession, type, enrollment, university, result, totalMarks, percent
        }

        const studentExist = await StudentModel.findOne({
            $or: [{ rollNumber }, { enrollment }]
        })

        const alreadySavedData = studentExist?.marksheet.some((semResult) => semResult.semester === semester);
        console.log("already exist", alreadySavedData)
        if (alreadySavedData) {
            throw new ApiError(400, "Data already exists!");
        }

        let studentId = studentExist?._id;
        let createStudent;
        if (!studentExist) {
            // create account of student
            createStudent = await StudentModel.create({
                studentName, fathersName, rollNumber, enrollment, course, type, branch, examSession, college, university
            })
            if (!createStudent) {
                throw new ApiError(500, "Server error to create student!")
            }
            studentId = createStudent._id;
        }

        // Get student details from db to append marksheet data
        const student = await StudentModel.findById(studentId);

        const marksheet = {
            semester,
            examSession,
            totalMarks,
            result,
            percent,
            subjects: extractedTableSubjectMarks
        }
        student.marksheet.push(marksheet)
        const updatedStudent = await student.save();
        if (!updatedStudent) {
            throw new ApiError(500, "Server error to submit marks!");
        }

        console.log("Successfully Data Saved!!")
        return res.status(200).json(
            new ApiResponse(200, updatedStudent, "Successfully data saved")
        )

    } catch (error) {
        throw new ApiError(500, "Server Problem", error);
    }
}


module.exports = { extractPDFData }