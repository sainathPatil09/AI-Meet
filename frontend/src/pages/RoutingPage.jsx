import React from 'react'
import HostMeetingPage from './HostMeetingPage';
import TranscriptMeetingPage from './TranscriptMeetingPage';
import TaskManagerPage from './TaskManagerPage';
import { useParams } from 'react-router-dom';

const RoutingPage = () => {
  const { section } = useParams();

  const renderSection = () => {
    switch (section) {
      case 'hostmeeting':
        return <HostMeetingPage />;
      case 'transcriptmeeting':
        return <TranscriptMeetingPage />;
      case 'taskmanager':
        return <TaskManagerPage />;
      default:
        return <div>404: Section not found</div>;
    }
  };

  return (
    <div className="p-4">
      {renderSection()}
    </div>
  );
};

export default RoutingPage
