import React, { useState } from "react";

const AudioRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const link = document.createElement("a");
        link.href = audioUrl;
        link.download = `meeting-audio-${Date.now()}.webm`;
        link.click();
        setAudioChunks([]);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start audio recording:", err);
      alert("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-2 mt-4">
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          🎤 Start Audio Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          ⏹ Stop Recording & Download
        </button>
      )}
    </div>
  );
};

export default AudioRecorder;
