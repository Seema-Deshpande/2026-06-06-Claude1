import Comment from "../models/Comment.js";
import { createAppError } from "../utils/createAppError.js";
import { GoogleGenAI } from "@google/genai";

export const getCommentsByThread = async (threadId) => {
  const comments = await Comment.find({ thread: threadId }).populate("user", "name");
  // Return empty array if no comments exist (not an error condition)
  return comments;
};

export const createComment = async (thread, userId, content) => {
  const comment = await Comment.create({
    thread,
    user: userId,
    content,
  });
  const populatedComment =  await Comment.findById(comment._id).populate("user", "name");
  if (!populatedComment) {
    throw createAppError("Comment creation failed",500);
  }
  return populatedComment;
};

export const rephraseText = async (text) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `Rephrase the following text to be clearer, more engaging, and better written. Keep the same meaning and intent. Return only the rephrased text — no explanations, no preamble.

Text: ${text}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: { thinkingConfig: { thinkingBudget: 0 } },
  });
  return response.text;
};