import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { runAllTests } from './utils/testPreprocessing'
import { runAllMatchingTests } from './utils/testMatching'
import { runAllThresholdTests } from './utils/testThresholds'

// Make test functions available in browser console for testing
window.runTests = runAllTests
window.runMatchingTests = runAllMatchingTests
window.runThresholdTests = runAllThresholdTests

console.log('%c🧪 Part 2, 3 & 4 Testing Available', 'color: #2563eb; font-weight: bold; font-size: 14px')
console.log('Part 2 tests: window.runTests()')
console.log('Part 3 tests: window.runMatchingTests()')
console.log('Part 4 tests: window.runThresholdTests()')

//main css part
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
