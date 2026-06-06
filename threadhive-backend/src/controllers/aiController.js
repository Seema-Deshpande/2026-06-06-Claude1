import { fetchThreadById } from "../services/threadService.js";
import { summarizeThread } from "../services/aiService.js";

export const summarizeThreadById = async (req, res) => {
  const thread = await fetchThreadById(req.params.id);
  const summary = await summarizeThread(thread);
  res.status(200).json({
    success: true,
    message: "Summary generated successfully",
    data: { summary },
  });
};
