import React from "react";

const ShowData = ({ studentDetails, subjectMarksArray }) => {
  return (
    <>
      <div className="show_data_container mt-8 upload_pdf_container flex flex-col justify-center items-center m-auto max-w-sm ">
        {studentDetails.length !== 0 && (
          <>
            <div className="student-details flex flex-col justify-center items-center">
              <div className="name s-detail">
                <span className="font-semibold">Name : </span>
                <span>{studentDetails?.details?.sname} </span>
              </div>
              <div className="roll s-detail">
                <span className="font-semibold">RollNo : </span>
                <span> {studentDetails?.details?.roll}</span>
              </div>
              <div className="course s-detail">
                <span className="font-semibold">Course : </span>
                <span> {studentDetails?.details?.course} </span>
              </div>
              <div className="sem s-detail">
                <span className="font-semibold">Semester : </span>
                <span> {studentDetails?.details?.sem} </span>
              </div>
              <div className="branch s-detail">
                <span className="font-semibold">Branch : </span>
                <span> {studentDetails?.details?.branch} </span>
              </div>
              <div className="result s-detail">
                <span className="font-semibold">Result : </span>
                <span> {studentDetails?.details?.result} </span>
              </div>
              <div className="number s-detail">
                <span className="font-semibold">Total : </span>
                <span> {studentDetails?.details?.totalMarks}</span>
              </div>
            </div>
          </>
        )}

        <div className="subject_wise_container flex flex-col flex-wrap justify-center items-center w-full mt-4 ">
          {subjectMarksArray &&
            subjectMarksArray?.map((subject, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="subject flex justify-between w-[90%]">
                    <span className="subject_name">
                      {index + 1} . {subject.name} :{" "}
                    </span>
                    <span className="mark font-semibold ">{subject.marks}</span>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ShowData;
