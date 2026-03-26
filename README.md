# 🧠 JavaScript Quiz App

An interactive JavaScript quiz application built with **React 19** and **Vite**. Test your knowledge on core JavaScript concepts like `this`, `call`, `apply`, `bind`, `new`, `prototype`, and `polyfill` — with GitHub integration and a global leaderboard.

---

## ✨ Features

- **25 curated questions** across three difficulty tiers — Easy (10 pts), Medium (20 pts), and Hard (30 pts)
- **AI Custom Quiz Generation** — provide topics and generate a custom 15-question quiz using **Gemini 2.5 Flash** or **Gemini 2.5 Pro**
- **GitHub user integration** — search and select your GitHub profile before starting
- **Hints & explanations** — each question comes with a hint and a detailed post-answer explanation
- **Point-based scoring** with real-time tracking
- **Per-question timer** and difficulty indicator (color-coded)
- **Global leaderboard** — scores are saved to a remote API and displayed in an Olympic-style podium
- **Leaderboard modal** — viewable from the start screen without taking the quiz
- **Responsive, modern UI** with Google Fonts and Font Awesome icons

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Framework  | React 19                          |
| Build Tool | Vite 7                            |
| State Mgmt | `useReducer` + Context API        |
| Styling    | CSS Modules + Vanilla CSS         |
| Icons      | Font Awesome 7                    |
| Fonts      | Google Sans Flex, Noto Sans Mono  |
| API        | GitHub Users API, Custom REST API |
| AI         | Google Gemini API (2.5 Flash / Pro)|
| Linting    | ESLint 9                          |

---

## 📁 Project Structure

```
JS-quiz-app/
├── public/
│   └── logo.png
├── src/
│   ├── Contexts/
│   │   ├── QuizContext.jsx      # Quiz state provider (useReducer)
│   │   └── UserContext.jsx      # User state provider (GitHub user data)
│   ├── Reducers/
│   │   └── quizReducer.js       # Core quiz logic (next, answer, hint, start)
│   ├── services/
│   │   └── geminiService.js     # Gemini API integration for AI quiz generation
│   ├── assets/
│   ├── App.jsx                  # Main app — routes between screens
│   ├── AIQuizModal.jsx          # Multi-step AI quiz generation wizard
│   ├── AIQuizModal.module.css   # AI modal styles
│   ├── StartScreen.jsx          # Landing page with GitHub user search
│   ├── FinishScreen.jsx         # Results + global leaderboard
│   ├── Header.jsx               # Quiz header
│   ├── Question.jsx             # Renders the current question
│   ├── Option.jsx               # Individual answer option
│   ├── Hint.jsx                 # Expandable hint section
│   ├── Timer.jsx                # Per-question countdown timer
│   ├── User.jsx                 # GitHub user search result card
│   ├── SelectedUser.jsx         # Displays the selected GitHub profile
│   ├── data.js                  # All 25 default quiz questions
│   ├── index.css                # Global styles
│   └── main.jsx                 # App entry point
├── .env                         # Environment variables (API URL)
├── index.html                   # HTML entry point
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Divyanshu951/JS-quiz-app.git
cd JS-quiz-app

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=<your-api-base-url>
```

The app uses this URL to read/write leaderboard data via a REST endpoint at `/leaderboard`.

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎮 How It Works

1. **Start Screen** — Choose the default quiz or generate a custom AI quiz.
2. **GitHub Login** — Search and select your GitHub profile.
3. **Take the Quiz** — Answer questions with hints and color-coded difficulty.
4. **Finish Screen** — View your score, percentage, and your rank on the global leaderboard.

### Default Quiz Topics

| Topic            | Description                                         |
| ---------------- | --------------------------------------------------- |
| `this`           | Context binding and behavior in different scopes    |
| `call` / `apply` | Invoking functions with explicit `this` context     |
| `bind`           | Creating bound functions for deferred execution     |
| `new`            | Constructor functions and object instantiation      |
| `prototype`      | Prototype chain and inheritance mechanics           |
| `polyfill`       | Writing backward-compatible feature implementations |

### 🤖 AI Quiz Generation (Beta)

Click **"✨ Generate AI Quiz"** on the start screen to create a custom quiz:

1. **Enter your Gemini API key** — get one free at [aistudio.google.com](https://aistudio.google.com/apikey)
2. **Choose a model:**
   - **Gemini 2.5 Flash** — faster generation, free with Gemini Pro pack
   - **Gemini 2.5 Pro** — smarter output, free with Gemini Ultra pack
3. **Enter your topics** — comma-separated (e.g., `closures, promises, async/await`)
4. **Generate** — the AI creates 15 questions (5 easy, 5 medium, 5 hard) following the same quiz format

> Your API key is used in-browser only and is never sent to any server other than Google's Gemini API.

---

## 📜 License

This project is open source and available for personal and educational use.

---

## 👤 Author

**Divyanshu**

- [LinkedIn](https://www.linkedin.com/in/divyanshu-357240165/)
- [GitHub](https://github.com/Divyanshu951)
