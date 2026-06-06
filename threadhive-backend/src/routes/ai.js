import express from "express";
import { summarizeThreadById } from "../controllers/aiController.js";
import authHandler from "../middleware/authHandler.js";

const router = express.Router();

router.post("/:id/summarize", authHandler, summarizeThreadById);

export default router;
