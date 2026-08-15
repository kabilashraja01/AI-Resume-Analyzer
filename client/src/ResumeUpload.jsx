import React, { useRef, useState } from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];

export default function ResumeUpload({ onFileSelect }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const isValidFile = (file) => {
    const hasValidType = ACCEPTED_TYPES.includes(file.type);
    const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
    return hasValidType || hasValidExtension;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidFile(file)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      setFileName("");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setError("");
    setFileName(file.name);
    if (onFileSelect) onFileSelect(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="resume-upload">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <button type="button" onClick={handleButtonClick} className="resume-upload-btn">
        Upload Resume
      </button>

      {fileName && <p className="resume-upload-filename">Selected file: {fileName}</p>}
      {error && <p className="resume-upload-error">{error}</p>}
    </div>
  );
}