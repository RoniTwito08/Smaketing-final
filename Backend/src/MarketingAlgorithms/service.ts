interface GeminiCandidatePart {
  text: string;
}

interface GeminiCandidateContent {
  parts: GeminiCandidatePart[];
}

interface GeminiCandidate {
  content: GeminiCandidateContent;
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

export async function callLLM(prompt: string): Promise<any> {
  console.log("Calling Gemini API with prompt:", prompt);
  const MARKETING_GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!MARKETING_GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing. Please check your .env file.");
  }
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${MARKETING_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API request failed: ${response.statusText}`);
  }

  const data = (await response.json()) as GeminiResponse;

  const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!resultText) {
    throw new Error("Gemini API returned no text result.");
  }

  try {
    const cleaned = resultText
      .replace(/```json\s*/i, "")
      .replace(/```$/, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch {
    console.warn("⚠️ Gemini response is not valid JSON. Returning raw text.");
    return { suggestions: resultText };
  }
}
