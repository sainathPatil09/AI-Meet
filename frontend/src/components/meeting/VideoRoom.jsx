import React, { useEffect, useRef } from "react";
import AudioRecorder from "./AudioRecorder";

const VideoRoom = ({ roomName, displayName }) => {
  const jitsiContainerRef = useRef(null);
  console.log(roomName, displayName);
  useEffect(() => {
    if (!roomName) return;

    // Load Jitsi Meet External API script if not already loaded
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = () => startConference();
      document.body.appendChild(script);
    } else {
      startConference();
    }

    function startConference() {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomName,
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: displayName || "Guest",
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
          // More config options here if needed
        },
        interfaceConfigOverwrite: {
          // Customize interface if you want
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          // etc.
        },
      };

      // Clean up previous if any
      if (window.api) {
        window.api.dispose();
      }

      window.api = new window.JitsiMeetExternalAPI(domain, options);

      // Add event listeners if you want (mute, leave, etc)
      window.api.addEventListener("videoConferenceJoined", () => {
        console.log("Local User Joined");
      });
    }

    // Cleanup on unmount
    return () => window.api && window.api.dispose();
  }, [roomName, displayName]);

  return (
    <>
      <AudioRecorder />

      <div ref={jitsiContainerRef} style={{ height: "700px", width: "100%" }} />
    </>
  );
};

export default VideoRoom;
