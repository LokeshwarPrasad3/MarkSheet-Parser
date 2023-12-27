import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { host } from "../utls/api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const UploadPDF = ({ setStudentDetails,setSubjectMarksArray }) => {
  // eslint-disable-next-line
  const [localPdf, setLocalPdf] = useState(""); // store pdf in localpath to post api as data
  const [loading, setLoading] = useState(false); // loading submit button when response

  // When choose file then handle choose file
  const handleGetPdf = (e) => {
    // file must be pdf format
    if (e.target.files[0]?.type !== "application/pdf") {
      toast.error("File must be PDF format!!", { autoClose: 2000 });
      return;
    }
    const file = e.target.files[0];
    // need to create formData when post api req as data set
    const formData = new FormData();
    formData.append("file", file);
    setLocalPdf(formData);
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
      const { data } = await axios.post(`${host}/pdf/getpdf`, localPdf);

      // if data not found
      if (!data) {
        setLocalPdf("");
        setSubjectMarksArray([]);
        toast.error("Invalid Marksheet !!", { autoClose: 2000 });
        setLoading(false);
        return;
      }

      // if data status not success
      if (!data.success) {
        setLocalPdf("");
        setSubjectMarksArray([]);
        toast.error("Invalid Marksheet PDF !!", { autoClose: 2000 });
        setLoading(false);
        return;
      }

      console.log(data);

      // found data consist three values
      // status
      // message

      setStudentDetails(data);

      toast.success("Successfully Marksheet Extracted!!", { autoClose: 2000 });
      // set subjectMarks to display in frontend
      setSubjectMarksArray(data.subjectMarksArray);
      setLoading(false);
    } catch (error) {
      // value must be empty after error
      setLocalPdf("");
      setSubjectMarksArray([]);
      console.log("Error ", error);
      toast.error("Invalid Marksheet PDF !!", { autoClose: 2000 });
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
