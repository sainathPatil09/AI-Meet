import Team from "../models/Team.js";
import User from "../models/Users.js";
import nodemailer from "nodemailer";

export const createTeam = async (req, res) => {
  // console.log(req.body)
  const { teamName, members} = req.body;
  console.log(teamName, members, " 0-0-0-");
  const creatorId = req.user.id; // assuming auth middleware sets req.user
  try {
    const creator = await User.findById(creatorId);
    const team = new Team({
      name: teamName,
      members: [],
      creator: creator._id,
    });

    for (let member of members) {
      let user = await User.findOne({ email: member.email });

      if (!user) {
        user = new User({ name: member.name, email: member.email });
        await user.save();
      }

      team.members.push({ user: user._id, access: member.access });

      user.teams.push(team._id);
      await user.save();
    }

    await team.save();
    console.log(creator.email, "-----");
    // Email sending using creator's email credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: creator.email, // ✅ Email of creator
        pass: process.env.ADMIN_EMAIL_PASS, // 🔐 Creator's app-specific password
      },
    });

    
    for (let member of members) {
      const mailOptions = {
        from: `"${creator.name}" <${creator.email}>`,
        to: member.email,
        subject: `You've been added to the team "${teamName}"`,
        text: `Hello ${member.name},\n\n${creator.name} added you to the team "${teamName}" as a ${member.access}.\n\nLog in to start collaborating!\n\n- AI Meeting Summarizer`,
      };
      
      await transporter.sendMail(mailOptions);
      console.log("Email is sent------");
    }

    res
      .status(201)
      .json({ message: "Team created and invitations sent!", team });
  } catch (error) {
    console.error("Error creating team:", error);
    res
      .status(500)
      .json({ message: "Team creation failed", error: error.message });
  }
};

export const fetchTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId, "userId");

    const teams = await Team.find({
      $or: [{ "members.user": userId }, { creator: userId }],
    })
      .populate("members.user", "name email")
      .populate("creator", "name email")
      .exec();
    console.log(teams, "teams");
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};
