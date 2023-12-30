const mongoose = require("mongoose")



const subjectSchema = new mongoose.Schema({
    subject_name: { type: String, required: true },
    subject_marks: { type: String, required: true, }
})

const marksheetSchema = new mongoose.Schema({
    semester: {
        type: String,
        required: true,
    },
    examSession: {
        type: String,
        required: true,
    },
    totalMarks: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        enum: ["Pass", "Fail"],
    },
    percent: {
        type: String,
        required: true,
    },
    extractedRawData: {
        type: String,
        required: true,
    },
    subjects: [subjectSchema],

}, { timestamps: true });



const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    fathersName: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    enrollment: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    marksheet: [marksheetSchema]

}, { timestamps: true });

const StudentModel = mongoose.model("StudentModel", studentSchema);

module.exports = StudentModel;