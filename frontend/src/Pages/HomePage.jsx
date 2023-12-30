import { useState } from "react";
import ShowData from "../Components/ShowData";
import UploadPDF from "../Components/UploadPDF";

const HomePage = () => {

  // State store API Response of Marksheet Subject Marks
  const [subjectMarksArray, setSubjectMarksArray] = useState([]);
  // store details of student
  const [studentDetails, setStudentDetails] = useState({});

  return (
    <>
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

export default HomePage
