/**
 * Test Utility for Preprocessing Functions
 * Part 2: Testing and verification
 */

import faqPreprocessingService from '../services/faqPreprocessingService'
import { preprocessText, preprocessAndTokenize, getTextStats } from './textPreprocessing'

/**
 * Test FAQ dataset loading
 */
export const testFAQDataset = () => {
  console.log('\n=== Testing FAQ Dataset ===')
  
  try {
    // Initialize service
    faqPreprocessingService.initialize()
    
    // Get statistics
    const stats = faqPreprocessingService.getStatistics()
    console.log('✓ FAQ Dataset Statistics:', stats)
    
    // Get preprocessed FAQs
    const faqs = faqPreprocessingService.getPreprocessedFAQs()
    console.log(`✓ Total FAQs loaded: ${faqs.length}`)
    
    // Show sample FAQs
    console.log('\n--- Sample FAQs (first 3) ---')
    faqs.slice(0, 3).forEach(faq => {
      console.log({
        id: faq.id,
        category: faq.category,
        original: faq.originalQuestion,
        processed: faq.processedQuestion,
        tokens: faq.questionTokens,
        tokenCount: faq.questionTokens.length
      })
    })
    
    return { success: true, stats, faqs }
  } catch (error) {
    console.error('✗ Error testing FAQ dataset:', error)
    return { success: false, error }
  }
}

/**
 * Test text preprocessing with sample questions
 */
export const testPreprocessing = () => {
  console.log('\n=== Testing Text Preprocessing ===')
  
  const testQuestions = [
    'How do I reset my password?',
    'What is this chatbot?',
    'Can I delete my account?',
    'How much does it cost?',
    'Is there a mobile app available?'
  ]
  
  try {
    testQuestions.forEach((question, index) => {
      console.log(`\n--- Test ${index + 1} ---`)
      console.log('Original:', question)
      
      const processed = preprocessText(question)
      console.log('Processed:', processed)
      
      const tokens = preprocessAndTokenize(question)
      console.log('Tokens:', tokens)
      
      const stats = getTextStats(question)
      console.log('Stats:', stats)
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing preprocessing:', error)
    return { success: false, error }
  }
}

/**
 * Test user question preprocessing
 */
export const testUserQuestionPreprocessing = () => {
  console.log('\n=== Testing User Question Preprocessing ===')
  
  const testInputs = [
    'HOW DO I RESET MY PASSWORD?',
    '  What    is   this  chatbot?  ',
    'Can I delete my account???',
    'How much does it cost, really?',
    'Is there a mobile app available for iOS and Android?'
  ]
  
  try {
    faqPreprocessingService.initialize()
    
    testInputs.forEach((input, index) => {
      console.log(`\n--- User Question ${index + 1} ---`)
      console.log('Input:', input)
      
      const result = faqPreprocessingService.preprocessQuestion(input)
      console.log('Preprocessed:', result)
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing user question preprocessing:', error)
    return { success: false, error }
  }
}

/**
 * Run all tests
 */
export const runAllTests = () => {
  console.log('\n========================================')
  console.log('Running FAQ Preprocessing Tests - Part 2')
  console.log('========================================')
  
  const results = {
    datasetTest: testFAQDataset(),
    preprocessingTest: testPreprocessing(),
    userQuestionTest: testUserQuestionPreprocessing()
  }
  
  console.log('\n=== Test Summary ===')
  console.log('Dataset Test:', results.datasetTest.success ? '✓ PASS' : '✗ FAIL')
  console.log('Preprocessing Test:', results.preprocessingTest.success ? '✓ PASS' : '✗ FAIL')
  console.log('User Question Test:', results.userQuestionTest.success ? '✓ PASS' : '✗ FAIL')
  
  const allPassed = results.datasetTest.success && 
                    results.preprocessingTest.success && 
                    results.userQuestionTest.success
  
  console.log('\n' + (allPassed ? '✓ All tests passed!' : '✗ Some tests failed'))
  console.log('========================================\n')
  
  return results
}
