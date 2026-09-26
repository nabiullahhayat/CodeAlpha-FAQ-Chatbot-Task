import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { runAllTests } from './utils/testPreprocessing'
import { runAllMatchingTests } from './utils/testMatching'

// Make test functions available in browser console for testing
window.runTests = runAllTests
window.runMatchingTests = runAllMatchingTests

console.log('%c🧪 Part 2 & 3 Testing Available', 'color: #2563eb; font-weight: bold; font-size: 14px')
console.log('Part 2 tests: window.runTests()')
console.log('Part 3 tests: window.runMatchingTests()')

//main css part
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
