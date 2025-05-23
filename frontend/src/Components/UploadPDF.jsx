import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { host } from "../utls/api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const UploadPDF = ({ setStudentDetails, setSubjectMarksArray }) => {
  // eslint-disable-next-line
  const [localPdf, setLocalPdf] = useState(""); // store pdf in localpath to post api as data
  const [loading, setLoading] = useState(false); // loading submit button when response

  // When choose file then handle choose file
  const handleGetPdf = (e) => {
    // if user not selected any file or clicked (cancel)
    if (!e.target.files[0]) return;

    // validate pdf format type .pdf
    if (e.target.files[0]?.type !== "application/pdf") {
      toast.error("File must be PDF format!!", { autoClose: 2000 });
      return;
    }
    const marksheet = e.target.files[0];
    // need to create formData when post api req as data set
    const formData = new FormData();
    formData.append("file", marksheet);
    setLocalPdf(formData);
    console.log("Successfully get PDF !!");
  };

  // When click submit button then done post request which gives subject Marks data
  const submitPdfFile = async () => {
    setLoading(true);
    if (!localPdf) {
      toast.error("Please Choose PDF !!", { autoClose: 2000 });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`${host}/pdf/extract-pdf`, localPdf);
      console.log(data);
      // if data not found
      if (!data) {
        setLocalPdf("");
         setStudentDetails({});
        setSubjectMarksArray([]);
        toast.error("Invalid Marksheet !!", { autoClose: 2000 });
        setLoading(false);
        return;
      }

      // if data status not success
      if (!data.success) {
        setLocalPdf("");
         setStudentDetails({});
        setSubjectMarksArray([]);
        toast.error(`${data?.message}`, { autoClose: 2000 });
        setLoading(false);
        return;
      }

      console.log(data?.message);
      const pdfData = data?.data;

      // get data for subjectDetails
      const {
        studentName,
        fathersName,
        branch,
        course,
        college,
        enrollment,
        rollNumber,
        type,
        university,
      } = pdfData;
      const { semester, result, percent, totalMarks, examSession } =
        pdfData.marksheet[0];
      const wrapDetails = {
        studentName,
        fathersName,
        branch,
        course,
        college,
        type,
        university,
        enrollment,
        rollNumber,
        semester,
        percent,
        totalMarks,
        examSession,
        result,
      };
      // get data subjectMarksArray
      const subjectsMarks = pdfData.marksheet[0].subjects;

      setStudentDetails(wrapDetails);
      setSubjectMarksArray(subjectsMarks);
      setLocalPdf("");

      console.log(wrapDetails);
      console.log(subjectsMarks);

      toast.success("Successfully Marksheet Extracted!!", { autoClose: 2000 });
      setLoading(false);
    } catch (error) {
      // value must be empty after error
      setStudentDetails({});
      setLocalPdf("");
      setSubjectMarksArray([]);
      console.log("Error ", error);
      toast.error("Invalid or already Uploaded !!", { autoClose: 4000 });
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <div className="upload_pdf_container flex flex-col justify-center items-center m-auto max-w-sm ">
        <div className="upload_pdf flex flex-col gap-8 mt-12 justify-center items-center">
          <h2 className="text-2xl font-semibold">Upload Your Marksheet : </h2>
          <div className="input_upload_pdf">
            <input
              onChange={handleGetPdf}
              accept="application/pdf"
              type="file"
              name=""
              className="hidden"
              id="input_pdf"
            />
            <label
              htmlFor="input_pdf"
              className="bg-slate-300 hover:bg-slate-200 cursor-pointer px-2 py-2 rounded-sm"
            >
              Choose File
            </label>
          </div>
          <div className="submits flex py-4 ">
            <button
              onClick={submitPdfFile}
              className="bg-green-400 w-28 h-8 hover:bg-green-300 transition-all duration-300 ease-in px-5 py-1 font-signika border-none rounded-sm"
            >
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress size={20} />
                </Box>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default UploadPDF;
