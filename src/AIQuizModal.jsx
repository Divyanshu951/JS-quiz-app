import { useState } from "react";
import styles from "./AIQuizModal.module.css";
import { generateQuizWithAI } from "./services/geminiService";
import { useQuiz } from "./Contexts/QuizContext";

const STEPS = {
  CHOICE: "choice",
  API_KEY: "apiKey",
  TOPICS: "topics",
  LOADING: "loading",
  SUCCESS: "success",
};

function AIQuizModal({ onClose }) {
  const [step, setStep] = useState(STEPS.CHOICE);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash"); // added model selection
  const [topicsInput, setTopicsInput] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useQuiz();

  const parsedTopics = topicsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  async function handleGenerate() {
    if (parsedTopics.length === 0) return;

    setStep(STEPS.LOADING);
    setError(null);

    try {
      const questions = await generateQuizWithAI(
        apiKey,
        parsedTopics.join(", "),
        selectedModel
      );
      dispatch({ type: "loadAIQuestions", payLoad: questions });
      setStep(STEPS.SUCCESS);

      // Auto-close after a short delay
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      setError(err.message);
      setStep(STEPS.TOPICS);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* Step 1: Choice */}
        {step === STEPS.CHOICE && (
          <>
            <h2 className={styles.title}>✨ AI Quiz Generator</h2>
            <p className={styles.subtitle}>
              Want AI to create a custom quiz on topics of your choice?
            </p>
            <div className={styles.buttonRow}>
              <button
                className={styles.btnPrimary}
                onClick={() => setStep(STEPS.API_KEY)}
              >
                Yes, let's go!
              </button>
              <button className={styles.btnSecondary} onClick={onClose}>
                No, use default
              </button>
            </div>
          </>
        )}

        {/* Step 2: API Key & Model */}
        {step === STEPS.API_KEY && (
          <>
            <h2 className={styles.title}>🔑 API Key & Model</h2>
            <p className={styles.subtitle}>
              Your key is used in-browser only and never stored on any server.
            </p>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Gemini API Key</label>
              <input
                className={styles.input}
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                autoFocus
              />
              <p className={styles.helperText}>
                Get your free key at{" "}
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  style={{ color: "#a855f7" }}
                >
                  aistudio.google.com
                </a>
              </p>
            </div>

            <div className={styles.inputGroup} style={{ marginTop: "1.5rem" }}>
              <label className={styles.label}>Select Model</label>
              <div className={styles.modelToggle}>
                <label
                  className={`${styles.modelOption} ${
                    selectedModel === "gemini-2.5-flash" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="model"
                    value="gemini-2.5-flash"
                    checked={selectedModel === "gemini-2.5-flash"}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    style={{ display: "none" }}
                  />
                  <strong>Gemini Flash</strong>
                  <span className={styles.modelDesc}>Free with Gemini PRO pack</span>
                </label>

                <label
                  className={`${styles.modelOption} ${
                    selectedModel === "gemini-2.5-pro" ? styles.selected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="model"
                    value="gemini-2.5-pro"
                    checked={selectedModel === "gemini-2.5-pro"}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    style={{ display: "none" }}
                  />
                  <strong>Gemini Pro</strong>
                  <span className={styles.modelDesc}>Free with Gemini Ultra pack</span>
                </label>
              </div>
            </div>

            <div className={styles.buttonRow}>
              <button
                className={styles.btnPrimary}
                disabled={apiKey.length < 10}
                onClick={() => setStep(STEPS.TOPICS)}
              >
                Continue
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => setStep(STEPS.CHOICE)}
              >
                Back
              </button>
            </div>
          </>
        )}

        {/* Step 3: Topics */}
        {step === STEPS.TOPICS && (
          <>
            <h2 className={styles.title}>📝 Choose Your Topics</h2>
            <p className={styles.subtitle}>
              Enter topics separated by commas. The AI will generate 15
              questions.
            </p>

            {error && <div className={styles.errorBox}>⚠️ {error}</div>}

            <div className={styles.inputGroup}>
              <label className={styles.label}>Topics</label>
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. closures, promises, async/await"
                value={topicsInput}
                onChange={(e) => setTopicsInput(e.target.value)}
                autoFocus
              />
            </div>

            {parsedTopics.length > 0 && (
              <div className={styles.topicChips}>
                {parsedTopics.map((topic, i) => (
                  <span key={i} className={styles.chip}>
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.buttonRow}>
              <button
                className={styles.btnPrimary}
                disabled={parsedTopics.length === 0}
                onClick={handleGenerate}
              >
                Generate Quiz
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => {
                  setError(null);
                  setStep(STEPS.API_KEY);
                }}
              >
                Back
              </button>
            </div>
          </>
        )}

        {/* Step 4: Loading */}
        {step === STEPS.LOADING && (
          <>
            <h2 className={styles.title}>🧠 Generating Your Quiz</h2>
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>
                AI is crafting {parsedTopics.length > 0 ? parsedTopics.length : ""}{" "}
                topic{parsedTopics.length !== 1 ? "s" : ""} worth of questions...
              </p>
            </div>
          </>
        )}

        {/* Step 5: Success */}
        {step === STEPS.SUCCESS && (
          <div className={styles.successBox}>
            <span className={styles.successIcon}>🎉</span>
            <span className={styles.successText}>Quiz Generated!</span>
            <span className={styles.successSub}>
              15 questions ready. Starting shortly...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIQuizModal;
