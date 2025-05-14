import TeamCreate from "../components/team/TeamCreate.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTeam } from "../context/TeamContext.jsx";

const WorkspacePage = () => {
  const { teamSpaces, selectedTeam, selectTeam, loading } = useTeam();
  if (loading) return <div className="text-gray-500">Loading teams...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Workspace</h1>

      <TeamCreate />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Your Teams</h2>
        <ul className="space-y-2 ">
          {!teamSpaces ? (
            <p>No teams yet. Create or join one!</p>
          ) : (
            teamSpaces.map((team) => (
              <li
                key={team._id}
                className="p-4 bg-gray-200 w-70 rounded shadow"
                onClick={()=>selectTeam(team._id)}
              >
                <h3 className="font-bold">{team.name}</h3>
                <p>{team.members.length} members</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default WorkspacePage;
