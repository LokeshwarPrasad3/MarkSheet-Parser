const { extractSubjectMarks, extractStudentDetails } = require("../utils/extractors");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const StudentModel = require("../models/student.model.js")


const extractPDFData = async (req, res) => {
    try {
        // const files = req.file;
        const filePath = req.file?.path;
        const fileType = req.file?.mimetype;
        // console.log(filePath)
        // console.log(fileType)
        if (fileType !== "application/pdf" || !filePath) {
            throw new ApiError(400, "PDF file not found")
        }

        let extractedStudentDetails = await extractStudentDetails(filePath);
        const extractedTableSubjectMarks = await extractSubjectMarks(filePath);
        const getStartingDetailsIndex = extractedStudentDetails?.findIndex((element) => element.split(" ").join("") === "INSTITUTENAME:");
        const university = "CHHATTISGARH SWAMI VIVEKANAND TECHNICAL UNIVERSITY, BHILAI";
        const studentName = extractedStudentDetails[getStartingDetailsIndex + 1];
        const fathersName = extractedStudentDetails[getStartingDetailsIndex + 10];
        const semester = extractedStudentDetails[getStartingDetailsIndex + 3].slice(0, 1);
        const CourseBranch = extractedStudentDetails[getStartingDetailsIndex + 2].split(" "); // B Tech Branch Name
        const course = CourseBranch[0] + CourseBranch[1];
        const branch = CourseBranch.slice(2, CourseBranch.length).join(" ");
        const rollNumber = extractedStudentDetails[getStartingDetailsIndex + 4];
        const college = extractedStudentDetails[getStartingDetailsIndex + 5];
        const examSession = extractedStudentDetails[getStartingDetailsIndex + 11];
        const type = extractedStudentDetails[getStartingDetailsIndex + 12];
        const enrollment = extractedStudentDetails[getStartingDetailsIndex + 13];
        const result = extractedStudentDetails[getStartingDetailsIndex + 15].split(" ")[2];
        const totalMarks = extractedStudentDetails[getStartingDetailsIndex + 14].slice(extractedStudentDetails[getStartingDetailsIndex + 14].length - 3, extractedStudentDetails[getStartingDetailsIndex + 14].length); // total-marks
        const percent = totalMarks / 10;


        const studentExist = await StudentModel.findOne({
            $or: [{ rollNumber }, { enrollment }]
        });
        // is semester result already saved
        const semesterResultExist = studentExist?.marksheet.some((semResult) => semResult.semester === semester);
        if (semesterResultExist) {
            // throw new ApiError(400, "Sem result Data already exists!");
            return res.status(400).json(
                new ApiResponse(400, null, "Semester data already exist!")
            );
        }

        let studentId = studentExist?._id;
        // in case student not exist create account of student
        if (!studentExist) {
            const createStudent = await StudentModel.create({
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
            extractedRawData: extractedStudentDetails.join("\n"),
            subjects: extractedTableSubjectMarks
        }
        // Sort subjects by subject_name in descending order
        marksheet.subjects.sort((a, b) => b.subject_name.localeCompare(a.subject_name));
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


const accessAllStudentMarksheetDetails = async (req, res) => {
    const students = await StudentModel.find();
    return res.status(200).json(
        new ApiResponse(200, students, 'Data fetched successfully')
    )
}


module.exports = { extractPDFData, accessAllStudentMarksheetDetails }