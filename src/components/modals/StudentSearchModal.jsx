import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import DeleteConfirmation from "./DeleteConfirmation";

export const StudentSearchModal = ({ searchStudentData, onChangeCloseModal }) => {
  const [isDelete, setIsDelete] = useState(false);
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    setIsDelete(true);
  };

  const handleCloseModal = () => {
    onChangeCloseModal(true);
  };

  const formatHours = (totalHours) => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return `${hours}:${String(minutes).padStart(2, "0")}`;
  };

  const handleStudentDelete = async () => {
    toast.promise(promise, {
      loading: "Deleting student attendance...",
      success: () => {
        return `Deleted student attendance`;
      },
      error: "Error",
    });
    try {
      let response = await fetch(
        `https://do-track-backend-production.up.railway.app/api/attendance/delete-student-record/${searchStudentData?.data?.student_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setTimeout(() => {
          handleCloseModal();
          setIsDelete(false);
        }, 3000);
      }
    } catch (err) {
      toast.error("Could not make request right now");
    }
  };

  const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

  useEffect(() => {
    const body = document.body;

    const handleBodyOverflow = (isOpen) => {
      body.style.overflow = isOpen ? "hidden" : "auto";
    };

    handleBodyOverflow(true);
    return () => handleBodyOverflow(false);
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 flex">
      {isDelete ? (
        <DeleteConfirmation
          handleStudentDelete={handleStudentDelete}
          handleCloseModal={() => setIsDelete(false)}
          searchStudentData={searchStudentData}
        />
      ) : (
        <div className="flex flex-col p-4 gap-3 bg-white w-full h-auto max-w-md m-auto rounded-lg shadow">
          <div className="flex flex-col gap-4 rounded-lg relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="">
                        <div className="flex justify-between items-center p-2 text-xl font-bold bg-purple-200">
                            <h1 className="">Searched Student</h1>
                            <div className="flex justify-end">
                                <IoClose onClick={handleCloseModal} className="cursor-pointer" size={22} />
                            </div>
                        </div>
                        <div className="flex flex-col text-xs">
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>Student ID</h1>
                                <p>{searchStudentData?.data?.student_id}</p>
                            </div>
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>Student Name</h1>
                                <p>{searchStudentData?.data?.student_first_name} {searchStudentData?.data?.student_last_name}</p>
                            </div>
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>Year Level</h1>
                                <p>{searchStudentData?.data?.year_level_code} Year</p>
                            </div>
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>College</h1>
                                <p>{searchStudentData?.data?.college_name}</p>
                            </div>
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>Program</h1>
                                <p>{searchStudentData?.data?.program_name}</p>
                            </div>
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>Time In</h1>
                                <p>{new Date(searchStudentData?.data?.time_in).toLocaleDateString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    month: "long",
                                    day: "2-digit",
                                    year: "numeric",
                                })}</p>
                            </div>
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>Time Out</h1>
                                <p>{new Date(searchStudentData?.data?.time_in).toLocaleDateString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    month: "long",
                                    day: "2-digit",
                                    year: "numeric",
                                })}</p>
                            </div>
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>Time Rendered</h1>
                                <p>{formatHours(searchStudentData?.data?.total_hours)} hrs</p>
                            </div>
                            <div className="flex flex-row justify-between p-2 bg-white border-b hover:bg-gray-200 text-xs ">
                                <h1>Designator</h1>
                                <p>{searchStudentData?.data?.admin_first_name} {searchStudentData?.data?.admin_last_name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center pb-5">
                    <button onClick={handleDelete} className="border px-6 py-1 rounded-md w-[132px] text-sm text-white bg-red-500">
                        Delete
                    </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}