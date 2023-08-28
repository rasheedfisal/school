import React from "react";

const SubmitButton = ({ title, clicked, loadingTitle, icon, clickHandler }) => {
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={
        clicked
          ? "bg-transparent flex justify-center items-center text-Teal hover:bg-Teal hover:text-white py-1 px-1  font-semibold text-center hover:border-transparent rounded transition-colors duration-200 cursor-pointer"
          : "bg-transparent hover:bg-Teal text-Teal font-semibold hover:text-white py-1 px-1 border border-Teal hover:border-transparent rounded cursor-pointer"
      }
      disabled={clicked}
    >
      <div className="flex flex-row items-center justify-center">
        {clicked ? (
          <>
            <svg
              className="w-6 h-6 mr-3 -ml-1 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <div className="font-bold">{loadingTitle}</div>
          </>
        ) : (
          <>
            <div className="mr-2">{icon}</div>
            <div className="font-bold">{title}</div>
          </>
        )}
      </div>
    </button>
  );
};

export default SubmitButton;
