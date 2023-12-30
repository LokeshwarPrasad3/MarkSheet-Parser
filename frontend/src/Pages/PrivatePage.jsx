import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { host } from "../utls/api";
import { ToastContainer, toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const PrivatePage = () => {
  const [studentsMarksheetDetails, setStudentMarksheetDetails] = useState([]);

  //   const [totalPassedStudent, setTotalPassedStudent] = useState(0);
  //   const [totalFailedStudent, setTotalFailedStudent] = useState(0);

  const deleteStudentDetails = (_id) => {
    if (window.confirm("Are you sure?")) {
        window.alert("Feature Pending 😎")
        console.log(`cannot delete ${_id} - Feature pending`)
    }
  };

  const loadAllStudentDetails = useCallback(async () => {
    try {
      const { data } = await axios(`${host}/pdf/all-student-marksheet-details`);
      if (!data.success) {
        toast.error("Data not found!!", { autoClose: 2000 });
        return;
      }
      setStudentMarksheetDetails(data?.data);
      //   console.log(data);
      console.log(data.data);
    } catch (error) {
      console.log("Error Data not found", error);
      return;
    }
  }, []);

  useEffect(() => {
    loadAllStudentDetails();
  }, [loadAllStudentDetails]);

  return (
    <>
      <div className="students_marksheet_container flex flex-col justify-center mt-5 items-center flex-wrap ">
        {studentsMarksheetDetails && (
          <h2 className="font-semibold text-xl">
            {studentsMarksheetDetails[0]?.marksheet[0]?.semester} SEMESTER
            RESULT - ANALYSIS
          </h2>
        )}
        <div
          className="student marksheet
        2xl:w-[50%] lg:w-[70%] md:w-full sm:w-full w-full
        max-w-full overflow-x-auto flex justify-center items-center m-auto py-4"
        >
          {/* student roll no and student name */}
          {studentsMarksheetDetails?.length!==0 && (
            <>
              <table className="student_info w-full">
                <thead>
                  <tr className="table_tr">
                    <th className="table_tr_th min-w-[3rem] ">Sno.</th>
                    <th className="table_tr_th">Name</th>
                    <th className="table_tr_th">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsMarksheetDetails &&
                    studentsMarksheetDetails.map((student) => {
                      return (
                        <React.Fragment key={student?._id}>
                          <tr className="table_tr">
                            <td className="table_tr_td">
                              {student?.rollNumber.slice(
                                student?.rollNumber.length - 2,
                                student?.rollNumber.length
                              )}
                            </td>
                            <td className="table_tr_td min-w-[10rem] text-[0.9rem]">
                              {student?.studentName.slice(0, 18)}
                            </td>
                            <td
                              className={`table_tr_td ${
                                student?.marksheet[0].result === "Pass"
                                  ? ""
                                  : "bg-red-500 text-white"
                              }  `}
                            >
                              {student?.marksheet[0].result}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
              {/* student marks distribution */}
              <div className="w-full max-w-full overflow-x-auto">
                <table className="marks_distribution border-[1px] w-full border-collapse">
                  <thead>
                    <tr className="table_tr">
                      {studentsMarksheetDetails &&
                        studentsMarksheetDetails[0]?.marksheet[0]?.subjects.flatMap(
                          (subject, index) => {
                            return (
                              <React.Fragment key={index}>
                                <th className="table_tr_th">
                                  {subject.subject_name.slice(0, 5)}
                                </th>
                              </React.Fragment>
                            );
                          }
                        )}
                      <th className="table_tr_th">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsMarksheetDetails &&
                      studentsMarksheetDetails.map((student, studentIndex) => (
                        <tr className="table_tr" key={studentIndex}>
                          {student.marksheet[0].subjects.flatMap(
                            (subject, subjectIndex) => (
                              <React.Fragment key={subjectIndex}>
                                <td
                                  className={`table_tr_td ${
                                    subject.subject_marks < 35
                                      ? "bg-red-500 text-white"
                                      : ""
                                  }  `}
                                >
                                  {subject.subject_marks}
                                </td>
                              </React.Fragment>
                            )
                          )}
                          <td className="table_tr_td min-w-[2rem]">
                            <DeleteForeverIcon className="cursor-pointer"
                              onClick={() => deleteStudentDetails(student?._id)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        {/* <div className="analysis">
          <div className="passed_students">
            <span>Passed </span>
            <span>{}</span>
          </div>
          <div className="failed_students">
            <span>Failed </span>
            <span>{}</span>
          </div>
        </div> */}
      </div>

      <ToastContainer />
    </>
  );
};

export default PrivatePage;
