import { useState } from "react";
import axios from "axios";
import { useTeam } from "../../context/TeamContext";

const TeamCreate = () => {

  // const API = import.meta.env.VITE_API_BASE_URL
  // const token = localStorage.getItem("token");
  const { createTeam } = useTeam();
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([
    { name: "", email: "", access: "member" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([...members, { name: "", email: "", access: "member" }]);
  };

  // const createTeam = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       `${API}/api/teams/create`,
  //       { teamName, members },
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //         },
  //       }
  //     );
  //     onTeamCreated(res.data);
  //     setTeamName("");
  //     setMembers([{ name: "", email: "", access: "member" }]);
  //   } catch (err) {
  //     console.error("Error creating team:", err);
  //     alert("Failed to create team");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await createTeam({teamName, members }); // You can include more fields if needed
      setTeamName("");
      setMembers([{ name: "", email: "", access: "member" }]);
    } catch (err) {
      console.error("Error creating team:", err);
      alert("Failed to create team");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-3">Create New Team</h2>
      <input
        className="w-full p-2 border mb-3"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <h3 className="font-semibold mb-2">Team Members</h3>
      {members.map((member, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="p-2 border w-1/3"
            placeholder="Name"
            value={member.name}
            onChange={(e) => handleMemberChange(i, "name", e.target.value)}
          />
          <input
            className="p-2 border w-1/3"
            placeholder="Email"
            value={member.email}
            onChange={(e) => handleMemberChange(i, "email", e.target.value)}
          />
          <select
            className="p-2 border w-1/3"
            value={member.access}
            onChange={(e) => handleMemberChange(i, "access", e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>
      ))}
      <button className="text-blue-500" onClick={addMember}>
        + Add another member
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create Team"}
      </button>
    </div>
  );
};

export default TeamCreate;
