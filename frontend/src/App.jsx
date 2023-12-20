import { useState } from "react";
import Navbar from "./Components/Navbar";
import ShowData from "./Components/ShowData";
import UploadPDF from "./Components/UploadPDF";

function App() {
  // State store API Response of Marksheet Subject Marks
  const [subjectMarksArray, setSubjectMarksArray] = useState([]);

  return (
    <>
      <Navbar />
      <UploadPDF setSubjectMarksArray={setSubjectMarksArray} />
      <ShowData subjectMarksArray={subjectMarksArray} />
    </>
  );
}

export default App;
