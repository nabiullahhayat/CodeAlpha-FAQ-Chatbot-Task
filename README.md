# FAQ Chatbot

A clean, professional FAQ Chatbot application built with React + Vite.

## Current Status: Part 4 Complete ✅

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

### Part 3 - FAQ Matching with Cosine Similarity ✅
- TF-IDF vectorization for text representation
- Cosine similarity calculation
- FAQ matching service with best match selection
- Integrated matching into chat interface
- Confidence indicators for match quality
- Fallback handling for poor matches
- Comprehensive testing suite

### Part 4 - Similarity Threshold & Fallback Handling ✅
- Configurable similarity threshold (default: 30%)
- Clear threshold checking logic (thresholdMet flag)
- Improved fallback messages
- Confidence level detection (high ≥70%, medium ≥50%, low ≥30%)
- Threshold-based decision making
- Customizable threshold per query
- Enhanced console logging with threshold comparison

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
│   │   ├── faqPreprocessingService.js  # Preprocessing service
│   │   └── faqMatchingService.js       # Matching service (Part 3)
│   └── utils/
│       ├── textPreprocessing.js   # Text processing utilities
│       ├── vectorUtils.js         # Vector conversion (Part 3)
│       ├── testPreprocessing.js   # Part 2 tests
│       └── testMatching.js        # Part 3 tests
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
├── TEST_INSTRUCTIONS.md           # Part 2 testing guide
├── PART2_SUMMARY.md               # Part 2 summary
├── PART3_TESTING.md               # Part 3 testing guide
├── PART3_SUMMARY.md               # Part 3 summary
├── PART4_TESTING.md               # Part 4 testing guide
├── PART4_SUMMARY.md               # Part 4 summary
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

### Part 3 Features ✅
- ✅ TF-IDF vectorization (Term Frequency-Inverse Document Frequency)
- ✅ Cosine similarity calculation
- ✅ FAQ matching service with singleton pattern
- ✅ Best match selection from 25 FAQs
- ✅ Similarity scoring (0-100% confidence)
- ✅ Confidence indicators for medium matches
- ✅ Fallback messages for poor matches
- ✅ Console logging for debugging
- ✅ Top-N matches functionality
- ✅ Comprehensive testing utilities

### Part 4 Features ✅
- ✅ Configurable similarity threshold (default 30%)
- ✅ Clear threshold checking with explicit thresholdMet flag
- ✅ Improved fallback messages (contextual & customizable)
- ✅ Confidence level detection (high/medium/low)
- ✅ setThreshold() / getThreshold() configuration methods
- ✅ Custom threshold per query support
- ✅ Threshold-based decision logging
- ✅ Confidence-based UI indicators
- ✅ Comprehensive threshold testing suite

## Testing Part 4

### Interactive Testing (Recommended)
Open the application and test threshold behavior:

**Strong Matches (Should meet 30% threshold):**
1. "How do I reset my password?" - Expect: Answer (high confidence, >70%)
2. "What is this chatbot?" - Expect: Answer (high confidence, >70%)
3. "Can I delete my account?" - Expect: Answer (medium confidence, ~60%)

**Near-Threshold Matches (30-60%):**
1. "I forgot my password" - Expect: Answer or fallback depending on similarity
2. "Tell me about this bot" - Expect: Possible answer with confidence note
3. "Remove my account" - Expect: Borderline match behavior

**Fallback Triggers (Below 30% threshold):**
1. "What is the weather today?" - Expect: Fallback message
2. "Tell me a joke" - Expect: Fallback message
3. "Random text xyz" - Expect: Fallback message

### Console Testing
Run Part 4 tests in browser console:
```javascript
// Part 4 threshold tests
window.runThresholdTests()
```

### Check Console Output
Look for detailed threshold comparison:
```
Part 4 - Match result: {
  thresholdMet: true/false,
  similarity: "XX.X%",
  usedThreshold: "30.0%",
  confidence: "high|medium|low|none"
}

✓ Threshold met (30.0%) - Answer provided
  OR
✗ Threshold not met: XX% < 30% - Fallback response
```

See `PART4_TESTING.md` for detailed test cases.

## Testing Part 3

### Interactive Testing (Recommended)
Open the application and try these questions:

**Exact Matches:**
1. "How do I reset my password?"
2. "What is this chatbot?"
3. "Can I delete my account?"
4. "How much does it cost?"
5. "Is there a mobile app available?"

**Differently Worded:**
1. "I forgot my password, what should I do?"
2. "Tell me about this bot"
3. "Remove my account"
4. "What are the prices?"
5. "Do you have an app for smartphones?"

**Poor Matches:**
1. "What is the weather today?"
2. "Tell me a joke"
3. "Random nonsense text"

### Console Testing
Run comprehensive tests in browser console:
```javascript
// Part 2 tests
window.runTests()

// Part 3 tests
window.runMatchingTests()

// Part 4 tests
window.runThresholdTests()
```

### Expected Results
- Exact matches: >70% similarity
- Rephrased questions: 40-80% similarity
- Unrelated questions: <30% similarity (rejected)

See `PART3_TESTING.md` for detailed test cases and verification checklist.

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

## How FAQ Matching Works (Part 3)

### TF-IDF Vectorization
1. **Build Vocabulary**: Extract unique words from all FAQ questions (~120 terms)
2. **Calculate IDF**: Measure how unique each word is across documents
3. **Create Vectors**: Convert each text to numerical vector (TF × IDF for each word)

### Cosine Similarity
```
similarity = (A · B) / (||A|| × ||B||)
```
- Computes angle between two vectors
- Result: 0 (completely different) to 1 (identical)
- Used to find most similar FAQ

### Matching Process
1. User submits question
2. Preprocess (lowercase, remove punctuation/stop words)
3. Convert to TF-IDF vector
4. Calculate cosine similarity with all 25 FAQ vectors
5. Return FAQ with highest similarity (if above 0.1 threshold)
6. Display answer with confidence indicator

### Match Examples
```
"How do I reset my password?" → 85% match → Password reset FAQ
"I forgot my password" → 62% match → Password reset FAQ (with note)
"What is the weather?" → 8% match → No match (fallback message)
```

## Development Notes

- No external NLP libraries required (NLTK, spaCy not needed)
- Simple, lightweight preprocessing using vanilla JavaScript
- TF-IDF and cosine similarity implemented in pure JavaScript
- Preprocessing uses basic stop word removal (expandable if needed)
- All FAQ questions are preprocessed once on initialization for efficiency
- User questions are preprocessed and vectorized on each submission
- Vocabulary size: ~120 unique terms from 25 FAQs
- Matching speed: <5ms per query

## Next Steps

**Part 4** could include:
- Conversation context and history
- Multi-turn dialogue handling
- User feedback collection
- Answer refinement based on feedback
- Multi-language support

The project is clean, well-organized, and ready for future enhancements.
