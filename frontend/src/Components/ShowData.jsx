import React from "react";

const ShowData = ({ studentDetails, subjectMarksArray }) => {
  return (
    <>
      <div className="show_data_container mt-8 upload_pdf_container flex flex-col justify-center items-center m-auto max-w-sm ">
        {studentDetails?.studentName && (
          <>
            <div className="student-details flex flex-col justify-center items-center">
              <div className="name s-detail">
                <span className="font-semibold">Name : </span>
                <span>{studentDetails?.studentName} </span>
              </div>
              <div className="roll s-detail">
                <span className="font-semibold">RollNo : </span>
                <span> {studentDetails?.rollNumber}</span>
              </div>
              <div className="course s-detail">
                <span className="font-semibold">Course : </span>
                <span> {studentDetails?.course} </span>
              </div>
              <div className="sem s-detail">
                <span className="font-semibold">Semester : </span>
                <span> {studentDetails?.semester} </span>
              </div>
              <div className="branch s-detail">
                <span className="font-semibold">Branch : </span>
                <span> {studentDetails?.branch} </span>
              </div>
              <div className="result s-detail">
                <span className="font-semibold">Result : </span>
                <span
                  className={` ${
                    studentDetails?.result === "Pass"
                      ? "bg-green-500"
                      : "bg-red-500 text-white"
                  } px-1`}
                >
                  {studentDetails?.result}
                </span>
              </div>
              <div className="number s-detail">
                <span className="font-semibold">Total : </span>
                <span> {studentDetails?.totalMarks}</span>
              </div>
              <div className="number s-detail">
                <span className="font-semibold">Percent : </span>
                <span> {studentDetails?.percent}%</span>
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
                      {index + 1} . {subject?.subject_name} :{" "}
                    </span>
                    <span
                      className={`${
                        subject?.subject_marks < 35
                          ? "bg-red-500 text-white"
                          : ""
                      }  mark font-semibold px-1`}
                    >
                      {subject?.subject_marks}
                    </span>
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
