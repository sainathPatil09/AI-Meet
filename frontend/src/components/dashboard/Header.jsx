import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    navigate(`/dashboard/${teamId}/${section}`);
  };
  return (
    <div className="mt-5">
      <nav>
        <ul className="flex justify-center gap-10">
          <li
            onClick={() => handleNavigation("hostmeeting")}
            className="bg-gray-200 p-2 rounded-lg"
          >
            Host Meeting
          </li>
          <li
            onClick={() => handleNavigation("transcriptmeeting")}
            className="bg-gray-200 p-2 rounded-lg"
          >
            Transcript Meeting
          </li>
          <li
            onClick={() => handleNavigation("taskmanager")}
            className="bg-gray-200 p-2 rounded-lg"
          >
            Task Manager
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
