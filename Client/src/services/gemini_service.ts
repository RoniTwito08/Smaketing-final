import axios from "axios";
import { config } from "../config";

const API_BASE_URL = config.apiUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let abortController: AbortController | null = null;

export const sendImageToGemini = async (
  Image: string
): Promise<string | null> => {
  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();
  const { signal } = abortController;

  try {
    const response = await api.post(
      "/gemini",
      { base64Image: Image },
      { signal }
    );

    return response.data.response;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else {
      console.error("שגיאה בשליחת התמונה ל-Gemini:", error);
    }
    return null;
  }
};

export const cancelGeminiRequest = () => {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
};
