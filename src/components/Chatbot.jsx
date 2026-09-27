import { useState, useRef, useEffect } from 'react'
import './Chatbot.css'
import faqPreprocessingService from '../services/faqPreprocessingService'
import faqMatchingService from '../services/faqMatchingService'
import { saveMessages, loadMessages, clearMessages } from '../utils/storageUtils'

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
  const [isProcessing, setIsProcessing] = useState(false) // Part 9: Processing state
  const chatAreaRef = useRef(null)
  const inputRef = useRef(null)

  // Initialize FAQ preprocessing service on mount
  useEffect(() => {
    // Part 11: Enhanced error handling for FAQ initialization
    try {
      // Part 11: Validate services exist
      if (!faqPreprocessingService || !faqMatchingService) {
        throw new Error('FAQ services not available')
      }

      faqPreprocessingService.initialize()
      const stats = faqPreprocessingService.getStatistics()
      console.log('✅ FAQ Dataset loaded:', stats)
      
      // Initialize FAQ matching service
      faqMatchingService.initialize()
      const matchingStats = faqMatchingService.getStatistics()
      console.log('✅ FAQ Matching Service initialized:', matchingStats)
      
      setFaqLoaded(true)
      
      // Add info message about loaded FAQs
      const infoMessage = {
        id: Date.now(),
        text: `📚 Loaded ${stats.totalFAQs} FAQ questions across ${stats.categories} categories. Ready to answer your questions!`,
        type: 'bot',
      }
      setMessages(prev => [...prev, infoMessage])
    } catch (error) {
      // Part 11: Enhanced error handling and user feedback
      console.error('❌ Error loading FAQ data:', error)
      setFaqLoaded(false)
      
      // Part 11: Inform user of initialization error
      const errorMessage = {
        id: Date.now(),
        text: '⚠️ Sorry, there was an error loading the FAQ system. Some features may not work correctly. Please refresh the page.',
        type: 'bot',
      }
      setMessages(prev => [...prev, errorMessage])
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

  // Part 12: Focus input on mount and after the bot finishes responding
  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isProcessing])

  // Part 7: Save messages to localStorage whenever they change
  // Part 11: Enhanced with error handling
  useEffect(() => {
    try {
      const success = saveMessages(messages)
      if (!success) {
        console.warn('⚠️ Failed to save messages to localStorage')
      }
    } catch (error) {
      console.error('❌ Unexpected error saving messages:', error)
    }
  }, [messages])

  const handleSendMessage = () => {
    const trimmedMessage = inputValue.trim()

    // Part 11: Enhanced input validation
    if (!trimmedMessage || trimmedMessage === '' || isProcessing) {
      // Part 11: Optionally show feedback for empty input
      if (!isProcessing && inputValue && !trimmedMessage) {
        console.log('⚠️ Empty or whitespace-only input ignored')
      }
      return
    }

    // Part 11: Validate input length (prevent extremely long input)
    if (trimmedMessage.length > 1000) {
      const errorMessage = {
        id: Date.now(),
        text: '⚠️ Your question is too long. Please keep it under 1000 characters.',
        type: 'bot',
      }
      setMessages(prev => [...prev, errorMessage])
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

    // Part 12: Keep focus on the question field while the response is prepared
    inputRef.current?.focus()

    // Part 9: Set processing state and show typing indicator
    setIsProcessing(true)

    // Part 4: Enhanced FAQ matching with clear threshold and fallback handling
    if (faqLoaded) {
      setTimeout(() => {
        try {
          // Part 11: Validate matching service is available
          if (!faqMatchingService || typeof faqMatchingService.findBestMatch !== 'function') {
            throw new Error('FAQ matching service not available')
          }

          // Find best matching FAQ using configured threshold
          const matchResult = faqMatchingService.findBestMatch(trimmedMessage)
          
          // Part 11: Validate match result structure
          if (!matchResult || typeof matchResult !== 'object') {
            throw new Error('Invalid match result')
          }
          
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
            botResponse = matchResult.message || "Sorry, I couldn't find a relevant answer to your question."
            
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
          setIsProcessing(false) // Part 9: Reset processing state
        } catch (error) {
          // Part 11: Enhanced error handling
          console.error('❌ Error matching FAQ:', error)
          const errorMessage = {
            id: Date.now() + 1,
            text: '❌ Sorry, I encountered an unexpected error processing your question. Please try again, or rephrase your question.',
            type: 'bot',
          }
          setMessages(prev => [...prev, errorMessage])
          setIsProcessing(false) // Part 9: Reset processing state
        }
      }, 500)
    } else {
      // FAQ not loaded yet
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: '⚠️ Sorry, the FAQ system is still loading. Please try again in a moment.',
          type: 'bot',
        }
        setMessages(prev => [...prev, botMessage])
        setIsProcessing(false) // Part 9: Reset processing state
      }, 500)
    }
  }

  const handleInputKeyDown = (e) => {
    // Part 12: Enter submits via form; Shift+Enter stays safe for future multiline input
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault()
    }
  }

  // Part 8: Clear chat and reset conversation
  const handleClearChat = () => {
    // Confirm before clearing
    const confirmed = window.confirm(
      'Are you sure you want to clear the conversation? This will delete all messages and cannot be undone.'
    )
    
    if (confirmed) {
      console.log('🗑️ Clearing conversation...')
      
      // Clear localStorage
      clearMessages()
      
      // Reset state to default welcome messages
      setMessages(DEFAULT_WELCOME_MESSAGES)
      
      // Add FAQ info message after reset
      if (faqLoaded) {
        setTimeout(() => {
          const stats = faqPreprocessingService.getStatistics()
          const infoMessage = {
            id: Date.now(),
            text: `📚 Loaded ${stats.totalFAQs} FAQ questions across ${stats.categories} categories. Ready to answer your questions!`,
            type: 'bot',
          }
          setMessages(prev => [...prev, infoMessage])
        }, 100)
      }
      
      console.log('✅ Conversation cleared successfully')
      inputRef.current?.focus()
    }
  }

  return (
    <div className="chatbot-wrapper" role="main" aria-label="FAQ Chatbot Application">
      {/* Header */}
      <header className="chatbot-header">
        <h1 id="chatbot-title">FAQ Chatbot</h1>
      </header>

      {/* Chat Area */}
      <div 
        className="chat-area" 
        ref={chatAreaRef}
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions"
        aria-label="Conversation history"
      >
        {messages.map((message) => (
          <article
            key={message.id}
            className={`message ${message.type}-message`}
          >
            <div className="message-content">
              <p>
                <span className="sr-only">
                  {message.type === 'user' ? 'Your question: ' : 'Chatbot response: '}
                </span>
                {message.text}
              </p>
            </div>
          </article>
        ))}
        
        {/* Part 9: Typing Indicator */}
        {isProcessing && (
          <div
            className="message bot-message"
            role="status"
            aria-live="polite"
          >
            <div className="message-content typing-indicator">
              <div className="typing-dots" aria-hidden="true">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <span className="sr-only">Chatbot is typing a response</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form 
        className="input-area" 
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage()
        }}
        role="search"
        aria-label="Ask a question"
      >
        <label htmlFor="question-input" className="sr-only">
          Type your question here
        </label>
        <input
          id="question-input"
          ref={inputRef}
          type="text"
          className="message-input"
          placeholder="Type your question here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={isProcessing}
          aria-describedby="input-hint"
          autoComplete="off"
        />
        <span id="input-hint" className="sr-only">
          Press Enter to send your question, or Shift+Enter for a new line
        </span>
        <button
          className="send-button"
          disabled={isProcessing}
          type="submit"
          aria-label={isProcessing ? 'Processing your question, please wait' : 'Send your question'}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
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
      </form>

      {/* Part 12: Placed after the form so keyboard tab order is input → Send → Clear */}
      <button
        className="clear-chat-button"
        onClick={handleClearChat}
        aria-label="Clear chat history and start new conversation"
        title="Clear conversation"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="clear-text">Clear Chat</span>
      </button>
    </div>
  )
}

export default Chatbot
