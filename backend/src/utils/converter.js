const pdf_table_extractor = require('pdf-table-extractor');

function extractTable(pdfPath) {
    return new Promise((resolve, reject) => {
        pdf_table_extractor(pdfPath, resolve, reject);
    });
}

const printSubjectMarks = async (pdfPath) => {
    try {
        const result = await extractTable(pdfPath);
        if (!result) {
            console.log("PDF not extracted");
            return [];
        }

        let subjectWiseMarksDetails = [];

        for (let i = 2; i <= 11; i++) {
            const value = result?.pageTables[0]?.tables[i][3];
            if (value === "100") {
                const name = result?.pageTables[0]?.tables[i][2];
                const marks = result?.pageTables[0]?.tables[i][4];
                subjectWiseMarksDetails.push({ name, marks });
                console.log(`${JSON.stringify(result.pageTables[0].tables[i][2])} : ${JSON.stringify(result.pageTables[0].tables[i][4])}`);
            }
        }

        if (subjectWiseMarksDetails.length === 0) {
            return [];
        }

        console.log("here " + subjectWiseMarksDetails);
        return subjectWiseMarksDetails;
    } catch (err) {
        console.error('Error:', err);
        throw err; // rethrow the error to be caught by the calling code
    }
};

// const returnedArr = printSubjectMarks

module.exports = { printSubjectMarks };
