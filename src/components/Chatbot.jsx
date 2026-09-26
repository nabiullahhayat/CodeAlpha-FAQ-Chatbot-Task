import { useState, useRef, useEffect } from 'react'
import './Chatbot.css'
import faqPreprocessingService from '../services/faqPreprocessingService'

const Chatbot = () => {
  const [messages, setMessages] = useState([
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
  ])
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
      setFaqLoaded(true)
      
      // Add info message about loaded FAQs
      const infoMessage = {
        id: Date.now(),
        text: `📚 Loaded ${stats.totalFAQs} FAQ questions across ${stats.categories} categories.`,
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

    // Preprocess the user's question (Part 2 - preprocessing only, no matching yet)
    if (faqLoaded) {
      const preprocessedQuestion = faqPreprocessingService.preprocessQuestion(trimmedMessage)
      console.log('User question preprocessing:', {
        original: preprocessedQuestion.original,
        processed: preprocessedQuestion.processed,
        tokens: preprocessedQuestion.tokens,
        wordCount: preprocessedQuestion.wordCount
      })
    }

    // Add bot response (Part 2 - no FAQ matching yet)
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Thank you for your question! Your input has been preprocessed. FAQ matching functionality will be added in Part 3.",
        type: 'bot',
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)
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
