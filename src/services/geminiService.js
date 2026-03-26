const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const QUESTION_SCHEMA = `{
  id: number,
  topic: string,
  difficulty: "easy" | "medium" | "hard",
  points: 10 | 20 | 30,
  question: string,
  options: [{ id: 0, text: string }, { id: 1, text: string }, { id: 2, text: string }, { id: 3, text: string }],
  correctAnswer: 0 | 1 | 2 | 3,
  hint: string,
  successMessage: string,
  errorMessage: string,
  explanation: string
}`;

function buildPrompt(topics) {
  return `You are a JavaScript quiz generator. Generate exactly 15 multiple-choice quiz questions about the following topics: ${topics}.

Rules:
- 5 easy questions (points: 10), 5 medium questions (points: 20), 5 hard questions (points: 30)
- Each question MUST have exactly 4 options with ids 0, 1, 2, 3
- correctAnswer must be the id (0-3) of the correct option
- Questions should test deep understanding, not just definitions
- Hints should guide without giving away the answer
- Explanations should be educational and detailed
- Use backticks for inline code in question text, option text, and explanations where appropriate
- IDs should be sequential starting from 1

Return ONLY a valid JSON array (no markdown, no code fences, no explanation outside the array).

Each object in the array must follow this exact schema:
${QUESTION_SCHEMA}

Generate the questions now.`;
}

export async function generateQuizWithAI(apiKey, topics, model = "gemini-2.5-flash") {
  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: buildPrompt(topics) }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 400 || response.status === 403) {
      throw new Error("Invalid API key. Please check and try again.");
    }
    throw new Error(
      err?.error?.message || `Gemini API error (${response.status})`,
    );
  }

  const data = await response.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("=== RAW GEMINI RESPONSE ===");
  console.log(text);

  if (!text) {
    throw new Error("Gemini returned an empty response. Please try again.");
  }

  // Strip markdown code fences if present
  const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  console.log("=== CLEANED TEXT ===");
  console.log(cleaned);

  let questions;
  try {
    questions = JSON.parse(cleaned);
  } catch (parseErr) {
    console.error("=== JSON PARSE ERROR ===", parseErr);
    console.log("=== FIRST 500 CHARS ===", cleaned.substring(0, 500));
    throw new Error(
      "Failed to parse AI response. The model returned invalid JSON. Please try again.",
    );
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("AI returned no questions. Please try again.");
  }

  // Validate & normalise each question
  return questions.map((q, i) => ({
    id: i + 1,
    topic: q.topic || "General",
    difficulty: ["easy", "medium", "hard"].includes(q.difficulty)
      ? q.difficulty
      : "medium",
    points:
      q.difficulty === "easy" ? 10 : q.difficulty === "hard" ? 30 : 20,
    question: q.question || `Question ${i + 1}`,
    options: Array.isArray(q.options)
      ? q.options.map((o, j) => ({ id: j, text: o.text || `Option ${j + 1}` }))
      : [0, 1, 2, 3].map((j) => ({ id: j, text: `Option ${j + 1}` })),
    correctAnswer:
      typeof q.correctAnswer === "number" &&
      q.correctAnswer >= 0 &&
      q.correctAnswer <= 3
        ? q.correctAnswer
        : 0,
    hint: q.hint || "Think carefully about this one.",
    successMessage: q.successMessage || "Correct!",
    errorMessage: q.errorMessage || "Not quite. Try again next time!",
    explanation: q.explanation || "Review the topic for more details.",
  }));
}
