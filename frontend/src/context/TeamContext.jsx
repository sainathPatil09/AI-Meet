import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

// Create context
const TeamContext = createContext();

export const TeamProvider = ({ children, onNavigate }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamSpaces, setTeamSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(teamSpaces)
  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  // Fetch team spaces on component mount
  useEffect(() => {
    const fetchTeamSpaces = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with actual API call
        const response = await axios.get(`${API}/api/teams`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.statusText === "OK") {
          throw new Error("Failed to fetch team spaces");
        }

        const data = response.data;
        console.log(data);
        setTeamSpaces(data);

        // Set default team if available in localStorage
        const savedTeamId = localStorage.getItem("selectedTeamId");
        if (savedTeamId) {
          const savedTeam = data.find((team) => team._id === savedTeamId);
          if (savedTeam) {
            setSelectedTeam(savedTeam);
          } else if (data.length > 0) {
            // If saved team not found, select first team
            setSelectedTeam(data[0]);
            localStorage.setItem("selectedTeamId", data[0].id);
          }
        } else if (data.length > 0) {
          // No saved team, select first team
          setSelectedTeam(data[0]);
          localStorage.setItem("selectedTeamId", data[0]._id);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching team spaces:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamSpaces();
  }, []);

  // Handle team selection
  const selectTeam = (teamId) => {
    console.log(teamId, "teamId");
    const team = teamSpaces.find((team) => team._id === teamId);
    // console.log(team)
    if (team) {
      setSelectedTeam(team);
      localStorage.setItem("selectedTeamId", teamId);
      // Redirect to dashboard with selected team space
      if (onNavigate) {
        onNavigate(`/dashboard/${teamId}`);
      }
    }
  };

  // Create a new team
  const createTeam = async ({teamName, members}) => {
    console.log(teamName, members);
    try {
      setLoading(true);
      // Simulate API call - replace with actual API call
      const response = await axios.post(
        `${API}/api/teams/create`,
        { teamName , members },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response)

      if (!response.statusText === "created") {
        throw new Error("Failed to create team");
      }

      const newTeam = response.data.team
      setTeamSpaces((prevTeams) => [...prevTeams, newTeam]);

      // Select the newly created team
    //   selectTeam(newTeam._id);

      return newTeam;
    } catch (err) {
      setError(err.message);
      console.error("Error creating team:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing team
  const updateTeam = async (teamId, teamData) => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API call
      const response = await fetch(`/api/teamspaces/${teamId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) {
        throw new Error("Failed to update team");
      }

      const updatedTeam = await response.json();

      setTeamSpaces((prevTeams) =>
        prevTeams.map((team) => (team.id === teamId ? updatedTeam : team))
      );

      // Update selected team if it was the one updated
      if (selectedTeam && selectedTeam.id === teamId) {
        setSelectedTeam(updatedTeam);
      }

      return updatedTeam;
    } catch (err) {
      setError(err.message);
      console.error("Error updating team:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a team
  const deleteTeam = async (teamId) => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API call
      const response = await fetch(`/api/teamspaces/${teamId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete team");
      }

      // Remove team from list
      setTeamSpaces((prevTeams) =>
        prevTeams.filter((team) => team.id !== teamId)
      );

      // If deleted team was selected, select another team
      if (selectedTeam && selectedTeam.id === teamId) {
        const remainingTeams = teamSpaces.filter((team) => team.id !== teamId);
        if (remainingTeams.length > 0) {
          selectTeam(remainingTeams[0].id);
        } else {
          setSelectedTeam(null);
          localStorage.removeItem("selectedTeamId");
        }
      }

      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error deleting team:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    selectedTeam,
    teamSpaces,
    loading,
    error,
    selectTeam,
    createTeam,
    updateTeam,
    deleteTeam,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};
