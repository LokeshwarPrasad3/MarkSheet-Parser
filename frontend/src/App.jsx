import { useState } from "react";
import Navbar from "./Components/Navbar";
import ShowData from "./Components/ShowData";
import UploadPDF from "./Components/UploadPDF";

function App() {
  // State store API Response of Marksheet Subject Marks
  const [subjectMarksArray, setSubjectMarksArray] = useState([]);
  // store details of student
  const [studentDetails, setStudentDetails] = useState({});

  return (
    <>
      <Navbar />
      <UploadPDF
        setSubjectMarksArray={setSubjectMarksArray}
        setStudentDetails={setStudentDetails}
      />
      <ShowData
        subjectMarksArray={subjectMarksArray}
        studentDetails={studentDetails}
      />
    </>
  );
}

export default App;
