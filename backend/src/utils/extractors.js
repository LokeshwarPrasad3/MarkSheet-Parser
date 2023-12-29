const pdf_table_extractor = require('pdf-table-extractor');
const fs = require("fs");
const PDFParser = require('pdf-parse');
const { ApiError } = require('./ApiError');


function extractTable(pdfPath) {
    return new Promise((resolve, reject) => {
        pdf_table_extractor(pdfPath, resolve, reject);
    });
}

async function extractStudentDetails(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await PDFParser(dataBuffer);
    
        // Extracted text details
        const textDetails = data.text;
        const validate = textDetails.split("\n")[6].split(" ").join("") === "CHHATTISGARHSWAMIVIVEKANANDTECHNICALUNIVERSITY,BHILAI";
        console.log(textDetails.split("\n")[6], validate);
        // if (!validate) {
        //     throw new Error("Invalid marksheet");
        // }
        return textDetails.split("\n");
    } catch (error) {
        console.log("Error in pdf-parser", error);
        return;
    }
}

const extractSubjectMarks = async (pdfPath) => {
    try {
        const result = await extractTable(pdfPath);
        if (!result) {
            throw new ApiError(400, "PDF is not extracted")
        }

        let subjectWiseMarksDetails = [];
// because extracted data starts from 2th
        for (let i = 2; i <= 11; i++) {
            const totalMarksValue = result?.pageTables[0]?.tables[i][3];
            if (totalMarksValue === "100") {
                const subject_name = result?.pageTables[0]?.tables[i][2];
                const subject_marks = result?.pageTables[0]?.tables[i][4];
                subjectWiseMarksDetails.push({ subject_name, subject_marks });
                console.log(`${JSON.stringify(result.pageTables[0].tables[i][2])} : ${JSON.stringify(result.pageTables[0].tables[i][4])}`);
            }
        }

        if (subjectWiseMarksDetails.length === 0) {
            throw new ApiError(400, "Invalid Marksheet PDF!");
        }

        console.log("subjec wise marks " , subjectWiseMarksDetails);
        return subjectWiseMarksDetails;
    } catch (err) {
        console.error('Error:', err);
        throw err; // rethrow the error to be caught by the calling code
    }
};

// const returnedArr = extractSubjectMarks

module.exports = { extractSubjectMarks, extractStudentDetails };
