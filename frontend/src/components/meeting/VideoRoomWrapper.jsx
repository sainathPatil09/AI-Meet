import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const VideoRoomWrapper = () => {
  const [activeTab, setActiveTab] = useState("start");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const navigate = useNavigate();
  const { teamId } = useParams();
  const handleStartMeeting = () => {
    if (!meetingTitle.trim()) {
      return alert("Please enter a meeting title");
    }
    // Create a unique room name
    // const roomName = `${meetingTitle.replace(/\s+/g, '-')}-${uuidv4()}`;
    // navigate(`/room/${roomName}`);
    // navigate(`/dashboard/${teamId}/hostmeeting/room/${roomName}`);

    const roomName = `${meetingTitle.replace(/\s+/g, "-")}-${uuidv4()}`;
    const link = `${window.location.origin}/dashboard/${teamId}/hostmeeting/room/${roomName}`;

    setMeetingLink(link);
  };

  const handleJoinMeeting = () => {
    if (!meetingLink.trim()) return alert("Please enter a valid meeting link");
    // Expecting link in format https://yourdomain/room/:roomName
    try {
      const url = new URL(meetingLink);
      const segments = url.pathname.split("/");
      const roomName = segments.pop() || segments.pop(); // handle trailing slash
      navigate(`/dashboard/${teamId}/hostmeeting/room/${roomName}`);
    } catch {
      alert("Invalid meeting link format");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Host Meeting</h1>

      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("start")}
          className={`px-4 py-2 font-medium ${
            activeTab === "start" ? "border-b-2 border-black" : "text-gray-500"
          }`}
        >
          Start a Meeting
        </button>
        <button
          onClick={() => setActiveTab("join")}
          className={`px-4 py-2 font-medium ${
            activeTab === "join" ? "border-b-2 border-black" : "text-gray-500"
          }`}
        >
          Join a Meeting
        </button>
      </div>

      {activeTab === "start" ? (
        <div className="border rounded-lg p-4">
          <label className="block text-sm font-medium mb-1">
            Meeting Title
          </label>
          <input
            type="text"
            placeholder="Team Sync, AI Discussion..."
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <button
            onClick={handleStartMeeting}
            className="px-4 py-2 bg-blue-600 text-white rounded mb-3"
          >
            Create Meeting
          </button>
          {meetingLink && (
            <div style={{ marginTop: "1rem" }}>
              <p>
                <strong>Meeting Link:</strong>
              </p>
              <input
                type="text"
                value={meetingLink}
                readOnly
                style={{ width: "100%", padding: "8px" }}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  alert("Meeting link copied!");
                }}
                style={{ marginTop: "0.5rem" }}
              >
                Copy Link
              </button>
              <button
                onClick={() =>
                  navigate(meetingLink.replace(window.location.origin, ""))
                }
                style={{ marginLeft: "1rem", marginTop: "0.5rem" }}
              >
                Start Meeting
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <input
            type="text"
            placeholder="https://yourdomain.com/room/room-name"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleJoinMeeting}
            className="w-full bg-black text-white py-2 rounded"
          >
            Join Meeting
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoRoomWrapper;
