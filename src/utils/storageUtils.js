/**
 * Part 7 - LocalStorage Utilities for Persistent Chat History
 * Part 11 - Enhanced Error Handling & Edge Cases
 * 
 * This module provides simple, reusable functions for saving and loading
 * chat messages to/from browser LocalStorage with robust error handling.
 */

const STORAGE_KEY = 'faq-chat-history'

/**
 * Validate message object structure
 * @param {Object} message - Message object to validate
 * @returns {boolean} - True if valid
 */
const isValidMessage = (message) => {
  return (
    message &&
    typeof message === 'object' &&
    typeof message.id !== 'undefined' &&
    typeof message.text === 'string' &&
    typeof message.type === 'string' &&
    (message.type === 'user' || message.type === 'bot')
  )
}

/**
 * Validate messages array
 * @param {Array} messages - Array to validate
 * @returns {boolean} - True if valid
 */
const isValidMessagesArray = (messages) => {
  if (!Array.isArray(messages)) {
    return false
  }
  
  // Empty array is valid
  if (messages.length === 0) {
    return true
  }
  
  // Check if all messages are valid
  return messages.every(isValidMessage)
}

/**
 * Save messages to LocalStorage
 * @param {Array} messages - Array of message objects to save
 * @returns {boolean} - True if saved successfully, false otherwise
 */
export const saveMessages = (messages) => {
  try {
    // Part 11: Enhanced validation
    if (!messages || !Array.isArray(messages)) {
      console.warn('saveMessages: Invalid messages array')
      return false
    }

    // Part 11: Validate message structure
    if (!isValidMessagesArray(messages)) {
      console.warn('saveMessages: Messages array contains invalid message objects')
      return false
    }

    const jsonString = JSON.stringify(messages)
    localStorage.setItem(STORAGE_KEY, jsonString)
    console.log(`💾 Saved ${messages.length} messages to LocalStorage`)
    return true
  } catch (error) {
    console.error('❌ Error saving messages to LocalStorage:', error)
    // Part 11: Attempt to clear corrupted data
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('🔧 Cleared potentially corrupted localStorage data')
    } catch (clearError) {
      console.error('❌ Could not clear localStorage:', clearError)
    }
    return false
  }
}

/**
 * Load messages from LocalStorage
 * @returns {Array|null} - Array of message objects, or null if none saved or invalid
 */
export const loadMessages = () => {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY)
    
    if (!jsonString) {
      console.log('📭 No saved messages in LocalStorage')
      return null
    }

    // Part 11: Enhanced JSON parsing with error handling
    let messages
    try {
      messages = JSON.parse(jsonString)
    } catch (parseError) {
      console.error('❌ Error parsing localStorage data:', parseError)
      console.log('🔧 Clearing corrupted localStorage data...')
      // Clear corrupted data
      try {
        localStorage.removeItem(STORAGE_KEY)
        console.log('✅ Corrupted data cleared')
      } catch (clearError) {
        console.error('❌ Could not clear corrupted data:', clearError)
      }
      return null
    }
    
    // Part 11: Validate loaded data structure
    if (!isValidMessagesArray(messages)) {
      console.warn('⚠️ loadMessages: Saved data is invalid or corrupted')
      console.log('🔧 Clearing invalid localStorage data...')
      try {
        localStorage.removeItem(STORAGE_KEY)
        console.log('✅ Invalid data cleared')
      } catch (clearError) {
        console.error('❌ Could not clear invalid data:', clearError)
      }
      return null
    }

    console.log(`📬 Loaded ${messages.length} messages from LocalStorage`)
    return messages
  } catch (error) {
    console.error('❌ Error loading messages from LocalStorage:', error)
    // Part 11: Attempt to clear on any error
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('🔧 Cleared localStorage after error')
    } catch (clearError) {
      console.error('❌ Could not clear localStorage:', clearError)
    }
    return null
  }
}

/**
 * Clear all saved messages from LocalStorage
 * @returns {boolean} - True if cleared successfully
 */
export const clearMessages = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    console.log('🗑️ Cleared messages from LocalStorage')
    return true
  } catch (error) {
    console.error('❌ Error clearing messages from LocalStorage:', error)
    return false
  }
}

/**
 * Check if there are saved messages in LocalStorage
 * @returns {boolean} - True if messages exist
 */
export const hasSavedMessages = () => {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY)
    return jsonString !== null && jsonString.length > 0
  } catch (error) {
    console.error('❌ Error checking for saved messages:', error)
    return false
  }
}

export default {
  saveMessages,
  loadMessages,
  clearMessages,
  hasSavedMessages,
  STORAGE_KEY,
  isValidMessage,
  isValidMessagesArray
}
