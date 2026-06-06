import { GoogleGenAI } from "@google/genai";

export const summarizeThread = async (thread) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `Summarize the following forum thread in 2-3 concise sentences. Capture the key points without omitting important details. Only use the title and content provided below — do not infer, speculate, or add any information not present in the text.

Title: ${thread.title}

Content: ${thread.content}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response.text;
};
