import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import VideoRoom from './VideoRoom';

const RoomPage = () => {
  const { roomName } = useParams();
  console.log(roomName)
  return <VideoRoom roomName={roomName} displayName="Sainath" />;
};

export default RoomPage;
