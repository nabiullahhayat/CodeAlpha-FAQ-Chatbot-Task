import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { runAllTests } from './utils/testPreprocessing'

// Make test functions available in browser console for Part 2 testing
window.runTests = runAllTests

console.log('%c🧪 Part 2 Testing Available', 'color: #2563eb; font-weight: bold; font-size: 14px')
console.log('Run tests from console: window.runTests()')

//main css part
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
