# Part 2 Testing Instructions

## Automated Testing

The FAQ dataset and preprocessing are automatically tested when the application loads.

### What to Check:

1. **Open the Application**
   - Navigate to: http://localhost:5174/
   - The chatbot should load successfully

2. **Check Browser Console**
   - Open Developer Tools (F12 or Cmd+Option+I on Mac)
   - Go to the Console tab
   - You should see:
     ```
     Initializing FAQ Preprocessing Service...
     Preprocessed 25 FAQ questions
     FAQ Dataset loaded: { totalFAQs: 25, categories: 7, ... }
     ```

3. **Check Chat Messages**
   - The chat should display:
     - Welcome message
     - "I'm here to help..." message
     - "📚 Loaded 25 FAQ questions across 7 categories." message

4. **Test Preprocessing**
   - Type any question in the input field
   - Click Send or press Enter
   - Check the console for preprocessing output:
     ```
     User question preprocessing: {
       original: "your question",
       processed: "preprocessed text",
       tokens: ["token1", "token2", ...],
       wordCount: X
     }
     ```

## Manual Testing Examples

Try these sample questions to test preprocessing:

1. **"HOW DO I RESET MY PASSWORD?"**
   - Should be normalized to lowercase
   - Punctuation removed
   - Stop words removed

2. **"  What    is   this  chatbot?  "**
   - Extra spaces should be trimmed
   - Multiple spaces normalized to single space

3. **"Can I delete my account???"**
   - Multiple punctuation marks removed
   - Text normalized

4. **"How much does it cost, really?"**
   - Commas and question marks removed
   - Stop words filtered

5. **"Is there a mobile app available for iOS and Android?"**
   - Long question properly tokenized
   - Stop words removed

## Expected Preprocessing Results

### Example 1: "How do I reset my password?"
- **Processed:** "reset password"
- **Tokens:** ["reset", "password"]
- **Word Count:** 2

### Example 2: "What is this chatbot?"
- **Processed:** "chatbot"
- **Tokens:** ["chatbot"]
- **Word Count:** 1

### Example 3: "Can I delete my account?"
- **Processed:** "delete account"
- **Tokens:** ["delete", "account"]
- **Word Count:** 2

## FAQ Dataset Verification

The dataset includes 25 FAQs across 7 categories:

- **General:** 3 FAQs
- **Account:** 4 FAQs
- **Technical:** 4 FAQs
- **Billing:** 4 FAQs
- **Features:** 5 FAQs
- **Getting Started:** 3 FAQs
- **Privacy:** 2 FAQs

## Success Criteria

✓ Application loads without errors
✓ FAQ dataset initializes successfully
✓ 25 FAQs loaded message appears in chat
✓ Console shows preprocessing statistics
✓ User questions are preprocessed correctly
✓ Preprocessing output is logged to console
✓ Text normalization works (lowercase, punctuation removal)
✓ Tokenization produces array of words
✓ Stop words are removed consistently

## Part 2 Scope

- ✅ FAQ dataset loaded
- ✅ Text preprocessing utilities working
- ✅ User input preprocessed
- ❌ FAQ matching NOT implemented (Part 3)
- ❌ Cosine similarity NOT implemented (Part 3)
- ❌ Backend/API NOT implemented (Future)
