# FAQ Chatbot

A responsive FAQ chatbot built with **React** and **Vite**. Users ask questions in natural language; the app preprocesses text, matches against a local FAQ knowledge base using **TF-IDF** and **cosine similarity**, applies a **similarity threshold**, and returns answers or helpful fallback messages—all in the browser with no backend.

> **Status:** Parts 1–14 complete — feature-complete, accessible, and production-ready for portfolio use.

---

## Purpose

This project demonstrates an end-to-end **retrieval-style FAQ assistant**: collect structured Q&A data, normalize user input, score semantic similarity to FAQ questions, and present results in a polished chat interface with persistence, error handling, and keyboard accessibility.

It was developed incrementally through the **CodeAlpha AI Internship** (see [CodeAlpha internship](#codealpha-ai-internship) below).

---

## Main features

| Area | What it does |
|------|----------------|
| **Chat UI** | Welcome messages, user/bot bubbles, auto-scroll, typing indicator |
| **FAQ knowledge base** | 70 questions across 9 categories (General, Account, Technical, Billing, Features, Getting Started, Privacy, Contact) |
| **Text preprocessing** | Lowercasing, punctuation removal, tokenization, stop-word filtering |
| **Matching** | TF-IDF vectors + cosine similarity to pick the best FAQ |
| **Threshold & fallback** | Default **30%** minimum similarity; clear fallback when no good match |
| **Confidence hints** | Optional notes for medium/low confidence matches |
| **Conversation history** | In-session message list with stable chronological order |
| **LocalStorage** | Persists chat across refresh and browser restarts |
| **Clear Chat** | Resets conversation and storage (with confirmation) |
| **Error handling** | Empty/whitespace input, max length (1000 chars), corrupt storage recovery |
| **Accessibility** | Labels, ARIA live regions, keyboard Tab/Enter, focus management |
| **Responsive design** | Desktop, tablet, and mobile layouts without horizontal overflow |

---

## How FAQ matching works

1. **Initialize (once):** All FAQ questions are preprocessed and converted to TF-IDF vectors; a shared vocabulary and IDF weights are built.
2. **User question:** Input is trimmed and validated, then preprocessed the same way as FAQs.
3. **Vectorize:** The question becomes a TF-IDF vector in the same vocabulary space.
4. **Similarity:** **Cosine similarity** is computed between the question vector and every FAQ vector; the highest score wins.
5. **Threshold:** If similarity ≥ **0.3** (`thresholdMet`), the matching answer is shown. Otherwise a **fallback message** is returned.
6. **Confidence:** High (≥70%), medium (≥50%), and low (≥30%) bands can append short guidance on borderline matches.

All logic runs client-side in JavaScript—no external NLP APIs.

---

## Tech stack

- **React 18** — UI components and state
- **Vite 5** — dev server and production build
- **CSS3** — custom styling (no UI framework)
- **JavaScript (ES modules)** — preprocessing, vectors, matching, storage

---

## Installation & running locally

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (included with Node)

### Setup

```bash
git clone <your-repo-url>
cd "FAQ Chatbot"
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (usually http://localhost:5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

Open the URL shown in the terminal, type a question, and press **Enter** or click **Send**.

---

## Project structure

```
FAQ Chatbot/
├── index.html                 # App shell & meta tags
├── package.json
├── vite.config.js
├── README.md                  # This file
├── PART14_TESTING.md          # Final manual test checklist
├── src/
│   ├── main.jsx               # React entry; exposes console test helpers
│   ├── App.jsx / App.css      # Page layout wrapper
│   ├── index.css              # Global resets & typography
│   ├── components/
│   │   ├── Chatbot.jsx        # Chat UI, send/clear, FAQ pipeline hookup
│   │   └── Chatbot.css
│   ├── data/
│   │   └── faqData.js         # FAQ dataset (70 entries)
│   ├── services/
│   │   ├── faqPreprocessingService.js
│   │   └── faqMatchingService.js
│   └── utils/
│       ├── textPreprocessing.js
│       ├── vectorUtils.js     # TF-IDF & cosine similarity
│       ├── storageUtils.js    # LocalStorage save/load/clear
│       ├── testPreprocessing.js
│       ├── testMatching.js
│       └── testThresholds.js
└── PART*_SUMMARY.md / PART*_TESTING.md   # Milestone notes (Parts 1–14)
```

---

## Testing

### Quick manual smoke test

1. Run `npm run dev`.
2. Ask **How do I reset my password?** — expect an FAQ answer.
3. Ask **What is the weather today?** — expect a fallback.
4. Refresh the page — conversation should persist.
5. Use **Clear Chat** — history resets to welcome messages.

Full checklist: **[PART14_TESTING.md](./PART14_TESTING.md)**

### Browser console suites

After the app loads, open DevTools → Console:

```javascript
window.runTests()           // Preprocessing (Part 2)
window.runMatchingTests()   // Matching (Part 3)
window.runThresholdTests()  // Threshold & fallback (Part 4)
```

### Production build

```bash
npm run build
```

Should complete with no errors. Use `npm run preview` to verify the built app.

---

## CodeAlpha AI Internship

This FAQ Chatbot was developed as part of the **[CodeAlpha](https://www.codealpha.tech/) AI Internship** program—a structured, multi-part assignment series covering:

- UI foundation and chat experience  
- Data collection and text preprocessing  
- Vector-based FAQ matching and thresholds  
- Persistence, reset, processing states, and dataset expansion  
- Error handling, accessibility, responsive polish, and final QA  

The repository reflects that progression from basic chat UI through a documented, testable portfolio project suitable for GitHub and technical interviews.

---

## License & usage

This project is intended for **learning and portfolio demonstration**. Feel free to fork and adapt with attribution; update the clone URL and internship details in this README for your own fork.

---

## Further documentation

Detailed milestone write-ups live in the repo root:

- Parts 1–13: `PART*_SUMMARY.md` and `PART*_TESTING.md` where available  
- Part 14: `PART14_SUMMARY.md`, `PART14_TESTING.md`
