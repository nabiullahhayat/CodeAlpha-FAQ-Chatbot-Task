/**
 * Text Preprocessing Utilities
 * Part 2: Text normalization and tokenization
 * Provides reusable functions for preprocessing both FAQ questions and user input
 */

/**
 * Convert text to lowercase
 * @param {string} text - Input text
 * @returns {string} - Lowercase text
 */
export const toLowerCase = (text) => {
  if (!text || typeof text !== 'string') return ''
  return text.toLowerCase()
}

/**
 * Remove extra whitespace and trim
 * @param {string} text - Input text
 * @returns {string} - Trimmed text with single spaces
 */
export const normalizeWhitespace = (text) => {
  if (!text || typeof text !== 'string') return ''
  return text.trim().replace(/\s+/g, ' ')
}

/**
 * Remove punctuation from text
 * @param {string} text - Input text
 * @returns {string} - Text without punctuation
 */
export const removePunctuation = (text) => {
  if (!text || typeof text !== 'string') return ''
  // Remove all punctuation except spaces
  return text.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ')
}

/**
 * Remove common stop words (basic set)
 * @param {string} text - Input text
 * @returns {string} - Text with stop words removed
 */
export const removeStopWords = (text) => {
  if (!text || typeof text !== 'string') return ''
  
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'this', 'but', 'they', 'have',
    'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how',
    'i', 'you', 'we', 'can', 'do', 'does', 'did', 'my', 'your',
    'me', 'us', 'them', 'their', 'our', 'am', 'been', 'being',
    'if', 'or', 'so', 'than', 'then', 'there', 'these', 'those'
  ])
  
  const words = text.split(' ')
  const filteredWords = words.filter(word => !stopWords.has(word.toLowerCase()))
  return filteredWords.join(' ')
}

/**
 * Tokenize text into words
 * @param {string} text - Input text
 * @returns {string[]} - Array of words
 */
export const tokenize = (text) => {
  if (!text || typeof text !== 'string') return []
  return text.split(/\s+/).filter(token => token.length > 0)
}

/**
 * Normalize text (basic preprocessing pipeline)
 * Converts to lowercase, removes punctuation, normalizes whitespace
 * @param {string} text - Input text
 * @returns {string} - Normalized text
 */
export const normalizeText = (text) => {
  if (!text || typeof text !== 'string') return ''
  
  let normalized = text
  normalized = toLowerCase(normalized)
  normalized = removePunctuation(normalized)
  normalized = normalizeWhitespace(normalized)
  
  return normalized
}

/**
 * Preprocess text (full preprocessing pipeline)
 * Includes normalization and stop word removal
 * @param {string} text - Input text
 * @param {boolean} removeStops - Whether to remove stop words (default: true)
 * @returns {string} - Preprocessed text
 */
export const preprocessText = (text, removeStops = true) => {
  if (!text || typeof text !== 'string') return ''
  
  let processed = normalizeText(text)
  
  if (removeStops) {
    processed = removeStopWords(processed)
  }
  
  return processed
}

/**
 * Preprocess and tokenize text
 * @param {string} text - Input text
 * @param {boolean} removeStops - Whether to remove stop words (default: true)
 * @returns {string[]} - Array of preprocessed tokens
 */
export const preprocessAndTokenize = (text, removeStops = true) => {
  const processed = preprocessText(text, removeStops)
  return tokenize(processed)
}

/**
 * Get word count from text
 * @param {string} text - Input text
 * @returns {number} - Number of words
 */
export const getWordCount = (text) => {
  if (!text || typeof text !== 'string') return 0
  const tokens = tokenize(text)
  return tokens.length
}

/**
 * Calculate text statistics
 * @param {string} text - Input text
 * @returns {object} - Statistics object
 */
export const getTextStats = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      originalLength: 0,
      wordCount: 0,
      processedText: '',
      tokens: []
    }
  }
  
  const processed = preprocessText(text)
  const tokens = tokenize(processed)
  
  return {
    originalLength: text.length,
    wordCount: tokens.length,
    processedText: processed,
    tokens: tokens
  }
}
