import React from "react";

const ShowData = ({ subjectMarksArray }) => {
  return (
    <>
      <div className="show_data_container upload_pdf_container flex flex-col justify-center items-center m-auto max-w-sm ">
        <div className="subject_wise_container flex flex-col flex-wrap justify-center items-center w-full mt-12 ">
          {subjectMarksArray.length === 0 ? (
            <>
              {/* <h1>Invalid Marksheet Format!!</h1> */}
              <h1></h1>
            </>
          ) : (
            subjectMarksArray &&
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
            })
          )}
        </div>
      </div>
    </>
  );
};

export default ShowData;
