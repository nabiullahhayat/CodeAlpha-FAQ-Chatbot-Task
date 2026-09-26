/**
 * FAQ Matching Service
 * Part 3: Match user questions to FAQ questions using cosine similarity
 */

import faqPreprocessingService from './faqPreprocessingService'
import { 
  buildVocabulary, 
  calculateIDF, 
  textToTFIDFVector,
  cosineSimilarity 
} from '../utils/vectorUtils'

/**
 * FAQ Matching Service Class
 * Handles FAQ matching using TF-IDF and cosine similarity
 */
class FAQMatchingService {
  constructor() {
    this.vocabulary = null
    this.idfMap = null
    this.faqVectors = null
    this.preprocessedFAQs = null
    this.initialized = false
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
   * @param {string} userQuestion - User's input question
   * @param {number} minSimilarity - Minimum similarity threshold (default: 0.1)
   * @returns {object} - Match result with question, answer, and score
   */
  findBestMatch(userQuestion, minSimilarity = 0.1) {
    if (!this.initialized) {
      this.initialize()
    }

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
        message: 'Please provide a valid question.'
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

    // Check if similarity meets minimum threshold
    if (highestSimilarity < minSimilarity || !bestMatch) {
      return {
        found: false,
        question: null,
        answer: null,
        similarity: highestSimilarity,
        faqId: null,
        category: null,
        message: "I couldn't find a good match for your question. Please try rephrasing or ask something else."
      }
    }

    // Return the best match
    return {
      found: true,
      question: bestMatch.question,
      answer: bestMatch.answer,
      similarity: highestSimilarity,
      faqId: bestMatch.id,
      category: bestMatch.category,
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
      vectorDimensions: this.vocabulary.length
    }
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
