import React, { useState } from 'react';
import { Toaster } from 'sonner';

const Logout = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 flex">
      <div className="items-center justify-center p-8 gap-4 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
        <h1 className="text-lg font-medium text-gray-600">Are you sure you want to logout?</h1>
        <div className="flex flex-row gap-3">
          <button onClick={onClose} className="text-gray-600 font-medium">
            Cancel
          </button>
          <button onClick={onConfirm} className="text-red-500 font-medium">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
