// controllers/commentController.js
import * as commentService from "../services/commentService.js";
import { requireText } from "../utils/createAppError.js";

export const fetchComments = async (req, res) => {
  const comments = await commentService.getCommentsByThread(req.params.threadId);

  res.status(200).json({
    success: true,
    message: "Comments fetched successfully",
    data: comments,
  });
};

export const addComment = async (req, res) => {
  const populatedComment = await commentService.createComment(
    req.body.thread,
    req.user.userId,
    req.body.content
  );

  res.status(201).json({
    success: true,
    message: "Comment created successfully",
    data: populatedComment,
  });
};

// POST /api/comments/rephrase
export const rephraseComment = async (req, res) => {
  const { text } = req.body;
  requireText(text);
  const rephrased = await commentService.rephraseText(text);
  res.status(200).json({
    success: true,
    message: "Text rephrased successfully",
    data: { rephrased },
  });
};
