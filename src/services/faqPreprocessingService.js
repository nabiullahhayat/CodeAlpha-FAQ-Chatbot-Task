/**
 * FAQ Preprocessing Service
 * Part 2: Service layer for preprocessing FAQ data and user questions
 * Prepares FAQ data for future similarity matching
 */

import { getAllFAQs } from '../data/faqData'
import { preprocessText, preprocessAndTokenize } from '../utils/textPreprocessing'

/**
 * Preprocess all FAQ questions
 * Returns FAQs with original and preprocessed questions
 * @returns {Array} - Array of FAQs with preprocessed data
 */
export const preprocessFAQs = () => {
  const faqs = getAllFAQs()
  
  return faqs.map(faq => ({
    ...faq,
    processedQuestion: preprocessText(faq.question),
    questionTokens: preprocessAndTokenize(faq.question),
    originalQuestion: faq.question
  }))
}

/**
 * Preprocess a single user question
 * @param {string} userQuestion - User's input question
 * @returns {object} - Preprocessed question data
 */
export const preprocessUserQuestion = (userQuestion) => {
  if (!userQuestion || typeof userQuestion !== 'string') {
    return {
      original: '',
      processed: '',
      tokens: [],
      wordCount: 0
    }
  }
  
  const processed = preprocessText(userQuestion)
  const tokens = preprocessAndTokenize(userQuestion)
  
  return {
    original: userQuestion,
    processed: processed,
    tokens: tokens,
    wordCount: tokens.length
  }
}

/**
 * Get preprocessed FAQ dataset
 * Initializes and caches preprocessed FAQs
 */
class FAQPreprocessingService {
  constructor() {
    this.preprocessedFAQs = null
    this.initialized = false
  }
  
  /**
   * Initialize the service and preprocess all FAQs
   */
  initialize() {
    if (!this.initialized) {
      console.log('Initializing FAQ Preprocessing Service...')
      this.preprocessedFAQs = preprocessFAQs()
      this.initialized = true
      console.log(`Preprocessed ${this.preprocessedFAQs.length} FAQ questions`)
    }
  }
  
  /**
   * Get all preprocessed FAQs
   * @returns {Array} - Preprocessed FAQs
   */
  getPreprocessedFAQs() {
    if (!this.initialized) {
      this.initialize()
    }
    return this.preprocessedFAQs
  }
  
  /**
   * Preprocess user question
   * @param {string} question - User's question
   * @returns {object} - Preprocessed question data
   */
  preprocessQuestion(question) {
    return preprocessUserQuestion(question)
  }
  
  /**
   * Get FAQ by ID with preprocessed data
   * @param {number} id - FAQ ID
   * @returns {object|null} - Preprocessed FAQ or null
   */
  getFAQById(id) {
    if (!this.initialized) {
      this.initialize()
    }
    return this.preprocessedFAQs.find(faq => faq.id === id) || null
  }
  
  /**
   * Get FAQs by category with preprocessed data
   * @param {string} category - Category name
   * @returns {Array} - Preprocessed FAQs in category
   */
  getFAQsByCategory(category) {
    if (!this.initialized) {
      this.initialize()
    }
    return this.preprocessedFAQs.filter(faq => faq.category === category)
  }
  
  /**
   * Get statistics about the FAQ dataset
   * @returns {object} - Dataset statistics
   */
  getStatistics() {
    if (!this.initialized) {
      this.initialize()
    }
    
    const totalFAQs = this.preprocessedFAQs.length
    const categories = [...new Set(this.preprocessedFAQs.map(faq => faq.category))]
    const avgTokensPerQuestion = this.preprocessedFAQs.reduce(
      (sum, faq) => sum + faq.questionTokens.length, 0
    ) / totalFAQs
    
    return {
      totalFAQs,
      categories: categories.length,
      categoryList: categories,
      avgTokensPerQuestion: Math.round(avgTokensPerQuestion * 100) / 100,
      initialized: this.initialized
    }
  }
  
  /**
   * Reset the service (useful for testing)
   */
  reset() {
    this.preprocessedFAQs = null
    this.initialized = false
  }
}

// Create and export a singleton instance
const faqPreprocessingService = new FAQPreprocessingService()

export default faqPreprocessingService
