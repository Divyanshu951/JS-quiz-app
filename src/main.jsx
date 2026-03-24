import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QuizProvider } from "./Contexts/QuizContext.jsx";
import { UserProvider } from "./Contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </UserProvider>
  </StrictMode>,
);
