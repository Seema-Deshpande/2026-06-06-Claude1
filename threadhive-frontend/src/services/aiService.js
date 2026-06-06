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
