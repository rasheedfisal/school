import React, { useCallback, useState } from "react";
import noImg from "../assets/select-img.png";

const FileUploader = ({ setFileElement, acceptFiles, defaultUrl, label }) => {
  const [sourceFile, setSourceFile] = useState(defaultUrl);
  const onFileDrop = useCallback(
    (e) => {
      const target = e.target;
      if (!target.files) return;
      const newFile = Object.values(target.files).map((file) => file);

      setFileElement(newFile[0]);

      var url = URL.createObjectURL(newFile[0]);
      setSourceFile(url);
    },

    []
  );
  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <div className="mb-4">
        <img
          className="w-28 h-28 rounded-md object-cover object-center"
          src={sourceFile !== "" ? sourceFile : noImg}
          alt="file"
        />
      </div>
      <label className="cursor-pointer mt-6">
        <span className="mt-2 leading-normal px-4 py-2 text-white bg-Teal hover:bg-blue-500 focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark rounded-full">
          {label}
        </span>
        <input
          type="file"
          className="hidden"
          //   onBlur={onBlur}
          onChange={onFileDrop}
          accept={acceptFiles}
        />
      </label>
    </div>
  );
};

export default FileUploader;
