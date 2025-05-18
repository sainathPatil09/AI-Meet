import React from "react";

const TranscriptUpload = () => {
  return (
    <>
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Upload Transcript</h1>
          <p className="text-sm text-gray-500">
            Upload a meeting transcript file for AI analysis
          </p>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <label htmlFor="">Meeting Title</label>
          <input
            className="border rounded-lg border-gray-400 p-2"
            type="text"
            placeholder="Enter title of meeting "
          />
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <label htmlFor="">Transcript File</label>
          <input
            className="border rounded-lg border-gray-400 p-2"
            type="file"
            accept="audio/*"
          />
          <button
            // onClick={handleSubmit}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default TranscriptUpload;
