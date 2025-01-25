import React from "react";

const Button = ({ onClick, name, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-[5px] mr-1 px-3 ${
        isSelected ? "bg-black text-white" : "bg-gray-200"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
