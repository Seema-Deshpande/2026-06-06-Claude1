import express from "express";
import {
  getAllThreads,
  getThreadByID,
  createThread,
  updateThread,
  deleteThread,
  summarizeThread,
  rephraseThread,
} from "../controllers/threadController.js";

import authHandler from "../middleware/authHandler.js";

const router = express.Router();

router.get("/", authHandler, getAllThreads);
router.post("/rephrase", authHandler, rephraseThread);
router.post("/", authHandler, createThread);
router.get("/:id", authHandler, getThreadByID);
router.put("/:id", authHandler, updateThread);
router.delete("/:id", authHandler, deleteThread);
router.post("/:id/summarize", authHandler, summarizeThread);

export default router;
