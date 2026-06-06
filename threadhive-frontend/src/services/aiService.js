import axiosInstance from "../api/axiosInstance.js";
import { AI_API } from "../config/apiConfig.js";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const summarizeThread = async (threadId) => {
  const res = await axiosInstance.post(
    AI_API.SUMMARIZE(threadId),
    {},
    { headers: getAuthHeaders() }
  );
  return res.data.data.summary;
};

export const rephraseText = async (text, endpoint) => {
  const res = await axiosInstance.post(
    endpoint,
    { text },
    { headers: getAuthHeaders() }
  );
  return res.data.data.rephrased;
};
