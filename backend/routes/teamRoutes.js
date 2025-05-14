import express from "express"
import { createTeam, fetchTeam } from "../controllers/teamController.js";

const router = express.Router();


router.post("/create", createTeam);
router.get("/", fetchTeam)

export default router;
