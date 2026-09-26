/**
 * FAQ Matching Service
 * Part 3: Match user questions to FAQ questions using cosine similarity
 * Part 4: Enhanced threshold configuration and fallback handling
 */

import faqPreprocessingService from './faqPreprocessingService'
import { 
  buildVocabulary, 
  calculateIDF, 
  textToTFIDFVector,
  cosineSimilarity 
} from '../utils/vectorUtils'

/**
 * Default configuration for FAQ matching
 */
const DEFAULT_CONFIG = {
  // Minimum similarity threshold for accepting a match
  minSimilarityThreshold: 0.3,
  
  // Confidence levels for user feedback
  highConfidenceThreshold: 0.7,
  mediumConfidenceThreshold: 0.5,
  
  // Fallback messages
  fallbackMessages: {
    noMatch: "Sorry, I couldn't find a relevant answer to your question. Please try rephrasing your question or contact support for assistance.",
    emptyQuery: "Please provide a valid question so I can help you find the right answer.",
    lowConfidence: "I found a possible answer, but I'm not very confident it matches your question. Here it is:"
  }
}

/**
 * FAQ Matching Service Class
 * Handles FAQ matching using TF-IDF and cosine similarity
 * Part 4: Enhanced with configurable thresholds and fallback handling
 */
class FAQMatchingService {
  constructor() {
    this.vocabulary = null
    this.idfMap = null
    this.faqVectors = null
    this.preprocessedFAQs = null
    this.initialized = false
    
    // Part 4: Configurable thresholds
    this.config = { ...DEFAULT_CONFIG }
  }
  
  /**
   * Set similarity threshold
   * Part 4: Allow dynamic threshold configuration
   * @param {number} threshold - New minimum similarity threshold (0-1)
   */
  setThreshold(threshold) {
    if (threshold >= 0 && threshold <= 1) {
      this.config.minSimilarityThreshold = threshold
      console.log(`Similarity threshold updated to: ${threshold}`)
    } else {
      console.warn('Threshold must be between 0 and 1')
    }
  }
  
  /**
   * Get current threshold
   * @returns {number} - Current minimum similarity threshold
   */
  getThreshold() {
    return this.config.minSimilarityThreshold
  }
  
  /**
   * Set custom fallback message
   * Part 4: Allow custom fallback messages
   * @param {string} type - Message type (noMatch, emptyQuery, lowConfidence)
   * @param {string} message - Custom message
   */
  setFallbackMessage(type, message) {
    if (this.config.fallbackMessages[type]) {
      this.config.fallbackMessages[type] = message
      console.log(`Fallback message '${type}' updated`)
    } else {
      console.warn(`Invalid fallback message type: ${type}`)
    }
  }
  
  /**
   * Get confidence level based on similarity score
   * @param {number} similarity - Similarity score
   * @returns {string} - Confidence level (high, medium, low)
   */
  getConfidenceLevel(similarity) {
    if (similarity >= this.config.highConfidenceThreshold) {
      return 'high'
    } else if (similarity >= this.config.mediumConfidenceThreshold) {
      return 'medium'
    } else {
      return 'low'
    }
  }

  /**
   * Initialize the matching service
   * Builds vocabulary, calculates IDF, and creates FAQ vectors
   */
  initialize() {
    if (this.initialized) {
      return
    }

    console.log('Initializing FAQ Matching Service...')

    // Ensure preprocessing service is initialized
    faqPreprocessingService.initialize()
    this.preprocessedFAQs = faqPreprocessingService.getPreprocessedFAQs()

    // Get all preprocessed questions
    const processedQuestions = this.preprocessedFAQs.map(faq => faq.processedQuestion)

    // Build vocabulary from all FAQ questions
    this.vocabulary = buildVocabulary(processedQuestions)
    console.log(`Vocabulary size: ${this.vocabulary.length} unique terms`)

    // Calculate IDF for all terms
    this.idfMap = calculateIDF(processedQuestions)

    // Convert all FAQ questions to TF-IDF vectors
    this.faqVectors = processedQuestions.map(question => 
      textToTFIDFVector(question, this.vocabulary, this.idfMap)
    )

    this.initialized = true
    console.log(`FAQ Matching Service initialized with ${this.preprocessedFAQs.length} FAQs`)
  }

  /**
   * Find the best matching FAQ for a user question
   * Part 4: Enhanced with clear threshold checking and fallback handling
   * @param {string} userQuestion - User's input question
   * @param {number} customThreshold - Optional custom threshold (overrides default)
   * @returns {object} - Match result with question, answer, score, and confidence
   */
  findBestMatch(userQuestion, customThreshold = null) {
    if (!this.initialized) {
      this.initialize()
    }

    // Use custom threshold or default
    const threshold = customThreshold !== null ? customThreshold : this.config.minSimilarityThreshold

    // Preprocess the user question
    const preprocessedQuestion = faqPreprocessingService.preprocessQuestion(userQuestion)
    const processedText = preprocessedQuestion.processed

    // Handle empty query
    if (!processedText || processedText.trim().length === 0) {
      return {
        found: false,
        question: null,
        answer: null,
        similarity: 0,
        faqId: null,
        category: null,
        confidence: 'none',
        thresholdMet: false,
        usedThreshold: threshold,
        message: this.config.fallbackMessages.emptyQuery
      }
    }

    // Convert user question to TF-IDF vector
    const userVector = textToTFIDFVector(processedText, this.vocabulary, this.idfMap)

    // Calculate similarity with all FAQ questions
    let bestMatch = null
    let highestSimilarity = 0

    this.preprocessedFAQs.forEach((faq, index) => {
      const similarity = cosineSimilarity(userVector, this.faqVectors[index])

      if (similarity > highestSimilarity) {
        highestSimilarity = similarity
        bestMatch = faq
      }
    })

    // Part 4: Clear threshold checking
    const thresholdMet = highestSimilarity >= threshold
    const confidence = this.getConfidenceLevel(highestSimilarity)

    // If threshold not met, return fallback
    if (!thresholdMet || !bestMatch) {
      return {
        found: false,
        question: bestMatch ? bestMatch.question : null,
        answer: null,
        similarity: highestSimilarity,
        faqId: bestMatch ? bestMatch.id : null,
        category: bestMatch ? bestMatch.category : null,
        confidence: 'none',
        thresholdMet: false,
        usedThreshold: threshold,
        message: this.config.fallbackMessages.noMatch
      }
    }

    // Return the best match with confidence info
    return {
      found: true,
      question: bestMatch.question,
      answer: bestMatch.answer,
      similarity: highestSimilarity,
      faqId: bestMatch.id,
      category: bestMatch.category,
      confidence: confidence,
      thresholdMet: true,
      usedThreshold: threshold,
      processedUserQuestion: processedText,
      processedFAQQuestion: bestMatch.processedQuestion
    }
  }

  /**
   * Find top N matches for a user question
   * @param {string} userQuestion - User's input question
   * @param {number} topN - Number of top matches to return (default: 3)
   * @returns {Array} - Array of top matches sorted by similarity
   */
  findTopMatches(userQuestion, topN = 3) {
    if (!this.initialized) {
      this.initialize()
    }

    // Preprocess the user question
    const preprocessedQuestion = faqPreprocessingService.preprocessQuestion(userQuestion)
    const processedText = preprocessedQuestion.processed

    if (!processedText || processedText.trim().length === 0) {
      return []
    }

    // Convert user question to TF-IDF vector
    const userVector = textToTFIDFVector(processedText, this.vocabulary, this.idfMap)

    // Calculate similarity with all FAQ questions
    const matches = this.preprocessedFAQs.map((faq, index) => ({
      faq,
      similarity: cosineSimilarity(userVector, this.faqVectors[index])
    }))

    // Sort by similarity (descending) and take top N
    return matches
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topN)
      .map(match => ({
        question: match.faq.question,
        answer: match.faq.answer,
        similarity: match.similarity,
        faqId: match.faq.id,
        category: match.faq.category
      }))
  }

  /**
   * Get matching statistics
   * Part 4: Include threshold configuration
   * @returns {object} - Statistics about the matching system
   */
  getStatistics() {
    if (!this.initialized) {
      return {
        initialized: false
      }
    }

    return {
      initialized: true,
      vocabularySize: this.vocabulary.length,
      totalFAQs: this.preprocessedFAQs.length,
      vectorDimensions: this.vocabulary.length,
      currentThreshold: this.config.minSimilarityThreshold,
      highConfidenceThreshold: this.config.highConfidenceThreshold,
      mediumConfidenceThreshold: this.config.mediumConfidenceThreshold
    }
  }
  
  /**
   * Get current configuration
   * Part 4: Return full configuration
   * @returns {object} - Current configuration
   */
  getConfig() {
    return { ...this.config }
  }

  /**
   * Reset the service (useful for testing)
   */
  reset() {
    this.vocabulary = null
    this.idfMap = null
    this.faqVectors = null
    this.preprocessedFAQs = null
    this.initialized = false
  }
}

// Create and export singleton instance
const faqMatchingService = new FAQMatchingService()

export default faqMatchingService
