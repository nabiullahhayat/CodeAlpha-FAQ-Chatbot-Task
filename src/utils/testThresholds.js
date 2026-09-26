/**
 * Test Utility for Part 4 - Threshold & Fallback Handling
 * Tests similarity threshold configuration and fallback responses
 */

import faqMatchingService from '../services/faqMatchingService'

/**
 * Test strong FAQ matches that should meet the threshold
 */
export const testStrongMatches = () => {
  console.log('\n=== Part 4: Testing Strong Matches (Should Meet Threshold) ===')
  
  const testQuestions = [
    'How do I reset my password?',
    'What is this chatbot?',
    'Can I delete my account?',
    'How much does it cost?',
    'Is there a mobile app available?',
  ]
  
  try {
    faqMatchingService.initialize()
    const currentThreshold = faqMatchingService.getThreshold()
    console.log(`Current threshold: ${(currentThreshold * 100).toFixed(1)}%\n`)
    
    testQuestions.forEach((question, index) => {
      console.log(`--- Test ${index + 1}: "${question}" ---`)
      const result = faqMatchingService.findBestMatch(question)
      
      const similarityPercent = (result.similarity * 100).toFixed(1)
      const thresholdPercent = (result.usedThreshold * 100).toFixed(1)
      
      if (result.thresholdMet) {
        console.log(`✓ PASS - Threshold met`)
        console.log(`  Similarity: ${similarityPercent}% >= ${thresholdPercent}%`)
        console.log(`  Confidence: ${result.confidence}`)
        console.log(`  Category: ${result.category}`)
        console.log(`  Answer provided: Yes`)
      } else {
        console.log(`✗ FAIL - Should have met threshold`)
        console.log(`  Similarity: ${similarityPercent}% < ${thresholdPercent}%`)
        console.log(`  Fallback triggered: Yes`)
      }
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing strong matches:', error)
    return { success: false, error }
  }
}

/**
 * Test differently worded questions near threshold
 */
export const testNearThresholdMatches = () => {
  console.log('\n=== Part 4: Testing Near-Threshold Matches ===')
  
  const testCases = [
    {
      question: 'I forgot my password',
      description: 'Shorter phrasing of password reset'
    },
    {
      question: 'Tell me about this bot',
      description: 'Informal phrasing'
    },
    {
      question: 'Remove my account',
      description: 'Very short request'
    },
    {
      question: 'What are the prices',
      description: 'Plural form'
    },
    {
      question: 'Do you have apps',
      description: 'Abbreviated question'
    },
  ]
  
  try {
    faqMatchingService.initialize()
    const currentThreshold = faqMatchingService.getThreshold()
    console.log(`Current threshold: ${(currentThreshold * 100).toFixed(1)}%\n`)
    
    testCases.forEach((testCase, index) => {
      console.log(`--- Test ${index + 1}: "${testCase.question}" ---`)
      console.log(`  Description: ${testCase.description}`)
      
      const result = faqMatchingService.findBestMatch(testCase.question)
      const similarityPercent = (result.similarity * 100).toFixed(1)
      const thresholdPercent = (result.usedThreshold * 100).toFixed(1)
      
      console.log(`  Similarity: ${similarityPercent}%`)
      console.log(`  Threshold: ${thresholdPercent}%`)
      console.log(`  Threshold met: ${result.thresholdMet ? 'Yes' : 'No'}`)
      console.log(`  Confidence: ${result.confidence}`)
      
      if (result.thresholdMet) {
        console.log(`  ✓ Answer provided: ${result.question}`)
      } else {
        console.log(`  ✗ Fallback triggered`)
      }
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing near-threshold matches:', error)
    return { success: false, error }
  }
}

/**
 * Test unrelated questions that should trigger fallback
 */
export const testFallbackTriggers = () => {
  console.log('\n=== Part 4: Testing Fallback Triggers (Should NOT Meet Threshold) ===')
  
  const testQuestions = [
    'What is the weather today?',
    'Tell me a joke',
    'Who won the game?',
    'Random nonsense xyz',
    'asdfghjkl',
  ]
  
  try {
    faqMatchingService.initialize()
    const currentThreshold = faqMatchingService.getThreshold()
    console.log(`Current threshold: ${(currentThreshold * 100).toFixed(1)}%\n`)
    
    testQuestions.forEach((question, index) => {
      console.log(`--- Test ${index + 1}: "${question}" ---`)
      const result = faqMatchingService.findBestMatch(question)
      
      const similarityPercent = (result.similarity * 100).toFixed(1)
      const thresholdPercent = (result.usedThreshold * 100).toFixed(1)
      
      if (!result.thresholdMet) {
        console.log(`✓ PASS - Correctly rejected`)
        console.log(`  Similarity: ${similarityPercent}% < ${thresholdPercent}%`)
        console.log(`  Fallback message: "${result.message.substring(0, 50)}..."`)
      } else {
        console.log(`✗ FAIL - Should have triggered fallback`)
        console.log(`  Similarity: ${similarityPercent}% >= ${thresholdPercent}%`)
        console.log(`  Answer incorrectly provided`)
      }
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing fallback triggers:', error)
    return { success: false, error }
  }
}

/**
 * Test threshold configuration
 */
export const testThresholdConfiguration = () => {
  console.log('\n=== Part 4: Testing Threshold Configuration ===')
  
  try {
    faqMatchingService.initialize()
    
    const testQuestion = 'How do I reset my password?'
    const thresholds = [0.1, 0.3, 0.5, 0.7, 0.9]
    
    console.log(`Test question: "${testQuestion}"\n`)
    
    thresholds.forEach(threshold => {
      console.log(`--- Testing with threshold: ${(threshold * 100).toFixed(1)}% ---`)
      
      const result = faqMatchingService.findBestMatch(testQuestion, threshold)
      const similarityPercent = (result.similarity * 100).toFixed(1)
      
      console.log(`  Similarity: ${similarityPercent}%`)
      console.log(`  Threshold met: ${result.thresholdMet ? 'Yes' : 'No'}`)
      console.log(`  Result: ${result.thresholdMet ? 'Answer provided' : 'Fallback triggered'}`)
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing threshold configuration:', error)
    return { success: false, error }
  }
}

/**
 * Test confidence levels
 */
export const testConfidenceLevels = () => {
  console.log('\n=== Part 4: Testing Confidence Levels ===')
  
  const testQuestions = [
    { q: 'How do I reset my password?', expected: 'high' },
    { q: 'I forgot my password', expected: 'medium/high' },
    { q: 'password', expected: 'low/medium' },
  ]
  
  try {
    faqMatchingService.initialize()
    
    testQuestions.forEach((test, index) => {
      console.log(`\n--- Test ${index + 1}: "${test.q}" ---`)
      console.log(`  Expected confidence: ${test.expected}`)
      
      const result = faqMatchingService.findBestMatch(test.q)
      const similarityPercent = (result.similarity * 100).toFixed(1)
      
      console.log(`  Similarity: ${similarityPercent}%`)
      console.log(`  Confidence: ${result.confidence}`)
      console.log(`  Threshold met: ${result.thresholdMet}`)
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing confidence levels:', error)
    return { success: false, error }
  }
}

/**
 * Run all Part 4 tests
 */
export const runAllThresholdTests = () => {
  console.log('\n========================================')
  console.log('Running Part 4 - Threshold & Fallback Tests')
  console.log('========================================')
  
  const results = {
    strongMatches: testStrongMatches(),
    nearThreshold: testNearThresholdMatches(),
    fallbackTriggers: testFallbackTriggers(),
    thresholdConfig: testThresholdConfiguration(),
    confidenceLevels: testConfidenceLevels()
  }
  
  console.log('\n=== Test Summary ===')
  console.log('Strong Matches Test:', results.strongMatches.success ? '✓ PASS' : '✗ FAIL')
  console.log('Near-Threshold Test:', results.nearThreshold.success ? '✓ PASS' : '✗ FAIL')
  console.log('Fallback Triggers Test:', results.fallbackTriggers.success ? '✓ PASS' : '✗ FAIL')
  console.log('Threshold Config Test:', results.thresholdConfig.success ? '✓ PASS' : '✗ FAIL')
  console.log('Confidence Levels Test:', results.confidenceLevels.success ? '✓ PASS' : '✗ FAIL')
  
  const allPassed = Object.values(results).every(r => r.success)
  
  console.log('\n' + (allPassed ? '✓ All Part 4 tests passed!' : '✗ Some tests failed'))
  console.log('========================================\n')
  
  return results
}
