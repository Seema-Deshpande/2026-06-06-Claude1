import express from "express";
import authHandler from "../middleware/authHandler.js";
import { addComment, fetchComments, rephraseComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/thread/:threadId", authHandler, fetchComments);
router.post("/rephrase", authHandler, rephraseComment);
router.post("/", authHandler, addComment);

export default router;