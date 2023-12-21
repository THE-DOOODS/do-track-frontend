import { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { toast } from "sonner";

const DeleteProgConfirmation = ({onChangeCloseModal, selectedProgramId, programData}) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));
    const token = localStorage.getItem("token");

    const handleCloseModal = () => {
        onChangeCloseModal(true);
    };

    const handleDeleteAll = async () => {
        if (selectedProgramId === null) {
            toast.error('Please choose programs for student attendance records to be deleted');
        } else {
            try {

                const selectedProgram = programData.find(program => program.program_id === selectedProgramId);
    
                toast.promise(
                    new Promise(async (resolve, reject) => {
                        try {
                            let response = await fetch(
                                `https://do-track-backend-production.up.railway.app/api/attendance/delete-program-record/${selectedProgramId}`,
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
                                const data = await response.json();
                                setTimeout(() => {
                                    handleCloseModal();
                                    resolve(data);
                                    window.location.reload();
                                }, 1000);
                            } else if (response.status === 404) {
                                reject(`No student attendance records to be deleted in ${selectedProgram.program_name}`);
                            }
                        } catch (err) {
                            reject("An error occurred while deleting the student attendance records");
                        }
    
                    }),
                    {
                        loading: "Deleting student attendance records...",
                        success: () => `Student attendance records successfully deleted in ${selectedProgram.program_name}`,
                        error: (message) => message,
                    },
                )
            } catch (err) {
                toast.error("Could not make request right now");
            }
        }
    };
    

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 flex">
            <div className="items-center justify-center p-8 gap-5 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
                <div className="flex flex-col items-center gap-0">
                <IoIosInformationCircleOutline size={72} className="text-primOrange" />
                <h1 className="text-xl font-medium text-gray-600">Confirm Delete</h1>
                </div>
                <h1 className="text-center text-sm text-gray-500">
                    You are attempting to delete all students attendance records in this program. Are you sure you want to proceed?
                </h1>
                <div className="flex flex-row gap-10">
                <button
                    onClick={handleCloseModal}
                    className="text-gray-600 font-medium px-6 py-1 border rounded-md border-gray-600 transition duration-500 hover:bg-purple-100 hover:text-white hover:border-white"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDeleteAll}
                    className="text-white font-medium px-6 py-1 rounded-md bg-primOrange transition duration-500 hover:bg-purple-100"
                >
                    Confirm
                </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProgConfirmation;