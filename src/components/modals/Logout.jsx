import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { IoIosInformationCircleOutline } from "react-icons/io";


const Logout = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 flex">
      <div className="items-center justify-center p-8 gap-5 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
        <div className='flex flex-col items-center gap-0'>
          <IoIosInformationCircleOutline size={72} className='text-primOrange' />
          <h1 className="text-xl font-medium text-gray-600">Confirm Log Out</h1>
        </div>
        <h1 className='text-center text-sm text-gray-500'>You are attempting to leave. Are you sure you want to log out?</h1>
        <div className="flex flex-row gap-10">
          <button onClick={onClose} className="text-gray-600 font-medium px-6 py-1 border rounded-md border-gray-600 hover:bg-purple-100 hover:text-white hover:border-white">
            Cancel
          </button>
          <button onClick={onConfirm} className="text-white font-medium px-6 py-1 rounded-md bg-primOrange hover:bg-purple-100">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
