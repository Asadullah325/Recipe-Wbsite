import React from "react";
import InputForm from "./inputForm";

const Model = ({ children, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none bg-black/50">
        <div className="relative mx-auto w-100 max-w-3xl rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
            <h3 className="text-3xl font-semibold">Login</h3>
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              onClick={onClose}
            >
              <span className="float-right text-3xl cursor-pointer leading-none font-semibold outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Model;
