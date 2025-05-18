import React, { useState } from 'react'
import TranscriptUpload from '../components/transcripts/TranscriptUpload';
import TranscriptList from '../components/transcripts/TranscriptList';

const TranscriptMeetingPage = () => {
  const [activeTab, setActiveTab] = useState("start");
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Transcript Meeting</h1>

      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("start")}
          className={`px-4 py-2 font-medium ${
            activeTab === "start" ? "border-b-2 border-black" : "text-gray-500"
          }`}
        >
          All Transcripts
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 font-medium ${
            activeTab === "upload" ? "border-b-2 border-black" : "text-gray-500"
          }`}
        >
          Upload New
        </button>
      </div>

      {activeTab === "start" ? (
        <TranscriptList/>
      ) : (
        
        <TranscriptUpload/>
      )}
    </div>
  )
}

export default TranscriptMeetingPage
