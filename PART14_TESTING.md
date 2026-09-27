# Part 14 — Final Testing Checklist

Use this checklist after `npm run dev` (default: http://localhost:5173 or the next free port).

## Automated checks

| Step | Command / action | Expected |
|------|------------------|----------|
| Install | `npm install` | Completes without errors |
| Build | `npm run build` | Vite build succeeds |
| Preview | `npm run preview` | Production bundle loads |

## Browser console test suites

Open DevTools → Console and run:

```javascript
window.runTests()           // Part 2 — preprocessing
window.runMatchingTests()   // Part 3 — cosine similarity matching
window.runThresholdTests()  // Part 4 — threshold & fallback
```

## End-to-end manual tests

### FAQ flow
- [ ] Ask: **How do I reset my password?** → relevant answer, high similarity
- [ ] Ask: **I forgot my password** → password-related answer (may include confidence note)
- [ ] Ask: **What is the weather today?** → fallback message (below 30% threshold)
- [ ] Ask: **Tell me a joke** → fallback message

### Input validation
- [ ] Submit empty input → nothing sent
- [ ] Submit whitespace only → nothing sent
- [ ] Paste 1000+ characters → bot warns about length

### Conversation & persistence
- [ ] Send several messages → order preserved, auto-scroll
- [ ] Refresh page → history restored from LocalStorage
- [ ] DevTools → Application → LocalStorage → key `faq-chat-history`

### Clear Chat
- [ ] Click **Clear Chat** → confirm → welcome messages return, storage cleared

### Typing indicator
- [ ] After send, dots appear until bot reply (~500ms)
- [ ] Input and Send disabled while processing

### LocalStorage edge cases
- [ ] Set `faq-chat-history` to invalid JSON → refresh → app recovers (welcome messages)
- [ ] Set value to `[{"bad":true}]` → refresh → invalid data cleared

### Accessibility (Part 12)
- [ ] Tab: question input → Send → Clear Chat
- [ ] Enter in input submits valid questions
- [ ] Send and Clear work with keyboard (Enter/Space)

### Responsive layout
- [ ] Desktop (~1200px): no horizontal scroll
- [ ] Tablet (~768px): layout intact
- [ ] Mobile (~375px): icon-only Send/Clear, readable messages
- [ ] Long question/answer wraps without overflow

### Console
- [ ] No uncaught errors during normal use
- [ ] FAQ init logs success (dataset loaded)

## Part 14 completion

Part 14 is complete when build passes, this checklist is satisfied, and `README.md` documents setup and project overview for GitHub.
