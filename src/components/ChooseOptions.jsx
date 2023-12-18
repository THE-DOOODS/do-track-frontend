import React from 'react';

const ChooseOptions = ({ option, onSelect }) => {
  return (
    <div
      className="cursor-pointer p-2 hover:bg-gray-200"
      onClick={() => onSelect(option)}
    >
      {option}
    </div>
  );
};

export default ChooseOptions;