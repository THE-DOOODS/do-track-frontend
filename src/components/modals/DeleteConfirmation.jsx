import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";

const DeleteConfirmation = ({ handleCloseModal, handleStudentDelete }) => {

  const onConfirm = () => {
    handleStudentDelete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 flex">
      <div className="items-center justify-center p-8 gap-5 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
        <div className="flex flex-col items-center gap-0">
          <IoIosInformationCircleOutline size={72} className="text-primOrange" />
          <h1 className="text-xl font-medium text-gray-600">Confirm Delete</h1>
        </div>
        <h1 className="text-center text-sm text-gray-500">
          Deleting this student information won't retrieve its current data. Are you sure you want to delete it?
        </h1>
        <div className="flex flex-row gap-10">
          <button
            onClick={handleCloseModal}
            className="text-gray-600 font-medium px-6 py-1 border rounded-md border-gray-600 transition duration-500 hover:bg-purple-100 hover:text-white hover:border-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-white font-medium px-6 py-1 rounded-md bg-primOrange transition duration-500 hover:bg-purple-100"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;