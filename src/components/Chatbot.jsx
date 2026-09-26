import { useState, useRef, useEffect } from 'react'
import './Chatbot.css'
import faqPreprocessingService from '../services/faqPreprocessingService'
import faqMatchingService from '../services/faqMatchingService'
import { saveMessages, loadMessages } from '../utils/storageUtils'

// Default welcome messages when no saved conversation exists
const DEFAULT_WELCOME_MESSAGES = [
  {
    id: 1,
    text: "👋 Welcome to FAQ Chatbot!",
    type: 'bot',
  },
  {
    id: 2,
    text: "I'm here to help answer your questions. Feel free to ask me anything!",
    type: 'bot',
  }
]

const Chatbot = () => {
  // Part 7: Load saved messages from localStorage, or use default welcome messages
  const [messages, setMessages] = useState(() => {
    const savedMessages = loadMessages()
    return savedMessages || DEFAULT_WELCOME_MESSAGES
  })
  const [inputValue, setInputValue] = useState('')
  const [faqLoaded, setFaqLoaded] = useState(false)
  const chatAreaRef = useRef(null)
  const inputRef = useRef(null)

  // Initialize FAQ preprocessing service on mount
  useEffect(() => {
    try {
      faqPreprocessingService.initialize()
      const stats = faqPreprocessingService.getStatistics()
      console.log('FAQ Dataset loaded:', stats)
      
      // Initialize FAQ matching service
      faqMatchingService.initialize()
      const matchingStats = faqMatchingService.getStatistics()
      console.log('FAQ Matching Service initialized:', matchingStats)
      
      setFaqLoaded(true)
      
      // Add info message about loaded FAQs
      const infoMessage = {
        id: Date.now(),
        text: `📚 Loaded ${stats.totalFAQs} FAQ questions across ${stats.categories} categories. Ready to answer your questions!`,
        type: 'bot',
      }
      setMessages(prev => [...prev, infoMessage])
    } catch (error) {
      console.error('Error loading FAQ data:', error)
      setFaqLoaded(false)
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Part 7: Save messages to localStorage whenever they change
  useEffect(() => {
    saveMessages(messages)
  }, [messages])

  const handleSendMessage = () => {
    const trimmedMessage = inputValue.trim()

    if (trimmedMessage === '') {
      return
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: trimmedMessage,
      type: 'user',
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Part 4: Enhanced FAQ matching with clear threshold and fallback handling
    if (faqLoaded) {
      setTimeout(() => {
        try {
          // Find best matching FAQ using configured threshold
          const matchResult = faqMatchingService.findBestMatch(trimmedMessage)
          
          console.log('Part 4 - Match result:', {
            found: matchResult.found,
            thresholdMet: matchResult.thresholdMet,
            similarity: (matchResult.similarity * 100).toFixed(1) + '%',
            usedThreshold: (matchResult.usedThreshold * 100).toFixed(1) + '%',
            confidence: matchResult.confidence,
            category: matchResult.category
          })

          let botResponse = ''
          
          // Part 4: Clear threshold-based decision
          if (matchResult.found && matchResult.thresholdMet) {
            // Threshold met - return the matched answer
            botResponse = matchResult.answer
            
            // Add confidence indicator for medium/low confidence matches
            if (matchResult.confidence === 'medium') {
              const similarityPercent = (matchResult.similarity * 100).toFixed(1)
              botResponse += `\n\n💡 Confidence: ${similarityPercent}% - If this doesn't fully answer your question, please try rephrasing.`
            } else if (matchResult.confidence === 'low') {
              const similarityPercent = (matchResult.similarity * 100).toFixed(1)
              botResponse += `\n\n⚠️ Low confidence: ${similarityPercent}% - This might not be the exact answer you're looking for. Please rephrase or contact support.`
            }
            
            console.log(`✓ Threshold met (${(matchResult.usedThreshold * 100).toFixed(1)}%) - Answer provided`)
          } else {
            // Part 4: Threshold not met - use fallback message
            botResponse = matchResult.message
            
            // Log details for debugging
            const similarityPercent = (matchResult.similarity * 100).toFixed(1)
            const thresholdPercent = (matchResult.usedThreshold * 100).toFixed(1)
            console.log(`✗ Threshold not met: ${similarityPercent}% < ${thresholdPercent}% - Fallback response`)
          }

          const botMessage = {
            id: Date.now() + 1,
            text: botResponse,
            type: 'bot',
          }
          setMessages(prev => [...prev, botMessage])
        } catch (error) {
          console.error('Error matching FAQ:', error)
          const errorMessage = {
            id: Date.now() + 1,
            text: 'Sorry, I encountered an error processing your question. Please try again.',
            type: 'bot',
          }
          setMessages(prev => [...prev, errorMessage])
        }
      }, 500)
    } else {
      // FAQ not loaded yet
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: 'Sorry, the FAQ system is still loading. Please try again in a moment.',
          type: 'bot',
        }
        setMessages(prev => [...prev, botMessage])
      }, 500)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="chatbot-wrapper">
      {/* Header */}
      <div className="chatbot-header">
        <h1>FAQ Chatbot</h1>
      </div>

      {/* Chat Area */}
      <div className="chat-area" ref={chatAreaRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}-message`}>
            <div className="message-content">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <input
          ref={inputRef}
          type="text"
          className="message-input"
          placeholder="Type your question here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Type your question"
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          aria-label="Send message"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L11 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="send-text">Send</span>
        </button>
      </div>
    </div>
  )
}

export default Chatbot
