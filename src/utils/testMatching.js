/**
 * Test Utility for FAQ Matching
 * Part 3: Testing cosine similarity and FAQ matching
 */

import faqMatchingService from '../services/faqMatchingService'

/**
 * Test questions that closely match FAQs
 */
export const testExactMatches = () => {
  console.log('\n=== Testing Exact/Close Matches ===')
  
  const testQuestions = [
    'How do I reset my password?',           // Should match FAQ ID 5
    'What is this chatbot?',                 // Should match FAQ ID 1
    'Can I delete my account?',              // Should match FAQ ID 7
    'How much does it cost?',                // Should match FAQ ID 12
    'Is there a mobile app available?',      // Should match FAQ ID 10
  ]
  
  try {
    faqMatchingService.initialize()
    
    testQuestions.forEach((question, index) => {
      console.log(`\n--- Test ${index + 1}: "${question}" ---`)
      const result = faqMatchingService.findBestMatch(question)
      
      if (result.found) {
        console.log(`✓ Match Found`)
        console.log(`  FAQ ID: ${result.faqId}`)
        console.log(`  Category: ${result.category}`)
        console.log(`  Similarity: ${(result.similarity * 100).toFixed(2)}%`)
        console.log(`  Question: ${result.question}`)
        console.log(`  Answer: ${result.answer.substring(0, 80)}...`)
      } else {
        console.log(`✗ No match found`)
        console.log(`  Similarity: ${(result.similarity * 100).toFixed(2)}%`)
      }
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing exact matches:', error)
    return { success: false, error }
  }
}

/**
 * Test differently worded questions
 */
export const testDifferentlyWordedQuestions = () => {
  console.log('\n=== Testing Differently Worded Questions ===')
  
  const testCases = [
    {
      question: 'I forgot my password, what should I do?',
      expected: 'Password reset related'
    },
    {
      question: 'Tell me about this bot',
      expected: 'Chatbot information'
    },
    {
      question: 'Remove my account',
      expected: 'Account deletion'
    },
    {
      question: 'What are the prices?',
      expected: 'Pricing information'
    },
    {
      question: 'Do you have an app for smartphones?',
      expected: 'Mobile app'
    },
  ]
  
  try {
    faqMatchingService.initialize()
    
    testCases.forEach((testCase, index) => {
      console.log(`\n--- Test ${index + 1}: "${testCase.question}" ---`)
      console.log(`  Expected: ${testCase.expected}`)
      
      const result = faqMatchingService.findBestMatch(testCase.question)
      
      if (result.found) {
        console.log(`✓ Match Found`)
        console.log(`  FAQ ID: ${result.faqId}`)
        console.log(`  Category: ${result.category}`)
        console.log(`  Similarity: ${(result.similarity * 100).toFixed(2)}%`)
        console.log(`  Question: ${result.question}`)
      } else {
        console.log(`✗ No match found`)
        console.log(`  Highest similarity: ${(result.similarity * 100).toFixed(2)}%`)
      }
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing differently worded questions:', error)
    return { success: false, error }
  }
}

/**
 * Test questions that don't match well
 */
export const testPoorMatches = () => {
  console.log('\n=== Testing Poor Matches ===')
  
  const testQuestions = [
    'What is the weather today?',
    'Who won the game yesterday?',
    'Tell me a joke',
    'Random nonsense text xyz 123',
    'asdfghjkl',
  ]
  
  try {
    faqMatchingService.initialize()
    
    testQuestions.forEach((question, index) => {
      console.log(`\n--- Test ${index + 1}: "${question}" ---`)
      const result = faqMatchingService.findBestMatch(question)
      
      if (result.found) {
        console.log(`Match Found (may be false positive)`)
        console.log(`  Similarity: ${(result.similarity * 100).toFixed(2)}%`)
        console.log(`  Question: ${result.question}`)
      } else {
        console.log(`✓ Correctly rejected (low similarity)`)
        console.log(`  Highest similarity: ${(result.similarity * 100).toFixed(2)}%`)
      }
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing poor matches:', error)
    return { success: false, error }
  }
}

/**
 * Test top N matches
 */
export const testTopMatches = () => {
  console.log('\n=== Testing Top 3 Matches ===')
  
  const testQuestion = 'How do I reset my password?'
  
  try {
    faqMatchingService.initialize()
    
    console.log(`Question: "${testQuestion}"`)
    const topMatches = faqMatchingService.findTopMatches(testQuestion, 3)
    
    console.log(`\nTop ${topMatches.length} matches:`)
    topMatches.forEach((match, index) => {
      console.log(`\n${index + 1}. Similarity: ${(match.similarity * 100).toFixed(2)}%`)
      console.log(`   Category: ${match.category}`)
      console.log(`   Question: ${match.question}`)
    })
    
    return { success: true }
  } catch (error) {
    console.error('✗ Error testing top matches:', error)
    return { success: false, error }
  }
}

/**
 * Run all matching tests
 */
export const runAllMatchingTests = () => {
  console.log('\n========================================')
  console.log('Running FAQ Matching Tests - Part 3')
  console.log('========================================')
  
  const results = {
    exactMatches: testExactMatches(),
    differentlyWorded: testDifferentlyWordedQuestions(),
    poorMatches: testPoorMatches(),
    topMatches: testTopMatches()
  }
  
  console.log('\n=== Test Summary ===')
  console.log('Exact Matches Test:', results.exactMatches.success ? '✓ PASS' : '✗ FAIL')
  console.log('Differently Worded Test:', results.differentlyWorded.success ? '✓ PASS' : '✗ FAIL')
  console.log('Poor Matches Test:', results.poorMatches.success ? '✓ PASS' : '✗ FAIL')
  console.log('Top Matches Test:', results.topMatches.success ? '✓ PASS' : '✗ FAIL')
  
  const allPassed = results.exactMatches.success && 
                    results.differentlyWorded.success && 
                    results.poorMatches.success &&
                    results.topMatches.success
  
  console.log('\n' + (allPassed ? '✓ All tests passed!' : '✗ Some tests failed'))
  console.log('========================================\n')
  
  return results
}
