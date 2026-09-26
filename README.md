# FAQ Chatbot

A clean, professional FAQ Chatbot application built with React + Vite.

## Current Status: Part 2 Complete ✅

### Part 1 - Project Setup & Basic UI ✅
- React + Vite setup
- Clean and professional UI design
- Responsive layout (desktop and mobile)
- White and blue international-style design
- Basic chat interface with welcome message

### Part 2 - FAQ Data Collection & Preprocessing ✅
- FAQ dataset with 25 question-answer pairs
- 7 categories (General, Account, Technical, Billing, Features, Getting Started, Privacy)
- Text preprocessing utilities (normalization, tokenization, stop word removal)
- FAQ preprocessing service with caching
- Integrated preprocessing into the application
- Console logging for testing and verification

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling (no external CSS frameworks)
- **JavaScript (ES6+)** - Core logic

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

Development mode:
```bash
npm run dev
```

This will start the Vite dev server at `http://localhost:5173` (or 5174 if 5173 is in use).

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
FAQ Chatbot/
├── index.html                      # HTML entry point
├── src/
│   ├── main.jsx                   # React app entry
│   ├── App.jsx                    # Main App component
│   ├── App.css                    # App styles
│   ├── index.css                  # Global styles
│   ├── components/
│   │   ├── Chatbot.jsx           # Chatbot component
│   │   └── Chatbot.css           # Chatbot styles
│   ├── data/
│   │   └── faqData.js            # FAQ dataset (25 FAQs)
│   ├── services/
│   │   └── faqPreprocessingService.js  # Preprocessing service
│   └── utils/
│       ├── textPreprocessing.js   # Text processing utilities
│       └── testPreprocessing.js   # Testing utilities
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
├── TEST_INSTRUCTIONS.md           # Part 2 testing guide
└── README.md                      # This file
```

## Features

### Part 1 Features ✅
- ✅ React + Vite project setup
- ✅ Clean, professional UI
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Chat message area with auto-scroll
- ✅ Text input for questions
- ✅ Send button with icon
- ✅ Welcome message
- ✅ Smooth animations

### Part 2 Features ✅
- ✅ FAQ dataset (25 questions across 7 categories)
- ✅ Text normalization (lowercase, trim, punctuation removal)
- ✅ Tokenization (word splitting)
- ✅ Stop word removal (60+ common English stop words)
- ✅ Preprocessing service with singleton pattern
- ✅ Automatic FAQ initialization on app load
- ✅ User question preprocessing with console logging
- ✅ Statistics and analytics functions

## Testing Part 2

### Automatic Testing
1. Open the application: `npm run dev`
2. Navigate to http://localhost:5174 (or the port shown in terminal)
3. Open browser Developer Tools (F12 or Cmd+Option+I)
4. Check Console tab for:
   - "Initializing FAQ Preprocessing Service..."
   - "Preprocessed 25 FAQ questions"
   - FAQ Dataset statistics

### Interactive Testing
1. Type a question in the chat input
2. Click Send or press Enter
3. Check Console for preprocessing output with:
   - Original question
   - Processed text
   - Tokens array
   - Word count

### Manual Console Testing
Run comprehensive tests in browser console:
```javascript
window.runTests()
```

See `TEST_INSTRUCTIONS.md` for detailed testing procedures.

## Preprocessing Examples

| Original Question | Processed Output |
|-------------------|------------------|
| "How do I reset my password?" | "reset password" |
| "What is this chatbot?" | "chatbot" |
| "Can I delete my account?" | "delete account" |
| "How much does it cost?" | "much cost" |
| "Is there a mobile app available?" | "mobile app available" |

## FAQ Categories

1. **General** - General information about the chatbot (3 FAQs)
2. **Account** - Account management questions (4 FAQs)
3. **Technical** - Technical support and troubleshooting (4 FAQs)
4. **Billing** - Pricing and payment questions (4 FAQs)
5. **Features** - Feature-related questions (5 FAQs)
6. **Getting Started** - Onboarding and setup (3 FAQs)
7. **Privacy** - Privacy and terms (2 FAQs)

## Development Notes

- No external NLP libraries required for Part 2 (NLTK, spaCy not needed)
- Simple, lightweight preprocessing using vanilla JavaScript
- Preprocessing uses basic stop word removal (expandable if needed)
- All FAQ questions are preprocessed once on initialization for efficiency
- User questions are preprocessed on each submission

## Next Steps

**Part 3** will include:
- FAQ matching algorithm
- Cosine similarity implementation
- Best answer selection
- Confidence scoring

The project is clean, well-organized, and ready for Part 3 implementation.
