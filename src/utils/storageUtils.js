/**
 * Part 7 - LocalStorage Utilities for Persistent Chat History
 * 
 * This module provides simple, reusable functions for saving and loading
 * chat messages to/from browser LocalStorage.
 */

const STORAGE_KEY = 'faq-chat-history'

/**
 * Save messages to LocalStorage
 * @param {Array} messages - Array of message objects to save
 * @returns {boolean} - True if saved successfully, false otherwise
 */
export const saveMessages = (messages) => {
  try {
    if (!messages || !Array.isArray(messages)) {
      console.warn('saveMessages: Invalid messages array')
      return false
    }

    const jsonString = JSON.stringify(messages)
    localStorage.setItem(STORAGE_KEY, jsonString)
    console.log(`💾 Saved ${messages.length} messages to LocalStorage`)
    return true
  } catch (error) {
    console.error('Error saving messages to LocalStorage:', error)
    return false
  }
}

/**
 * Load messages from LocalStorage
 * @returns {Array|null} - Array of message objects, or null if none saved
 */
export const loadMessages = () => {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY)
    
    if (!jsonString) {
      console.log('📭 No saved messages in LocalStorage')
      return null
    }

    const messages = JSON.parse(jsonString)
    
    if (!Array.isArray(messages)) {
      console.warn('loadMessages: Saved data is not an array')
      return null
    }

    console.log(`📬 Loaded ${messages.length} messages from LocalStorage`)
    return messages
  } catch (error) {
    console.error('Error loading messages from LocalStorage:', error)
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
    console.error('Error clearing messages from LocalStorage:', error)
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
    console.error('Error checking for saved messages:', error)
    return false
  }
}

export default {
  saveMessages,
  loadMessages,
  clearMessages,
  hasSavedMessages,
  STORAGE_KEY
}
