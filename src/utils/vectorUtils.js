/**
 * Vector Utilities for Text Representation
 * Part 3: Convert text to numerical vectors for similarity comparison
 */

/**
 * Build vocabulary from multiple text documents
 * @param {string[]} documents - Array of text strings
 * @returns {string[]} - Unique vocabulary (sorted)
 */
export const buildVocabulary = (documents) => {
  const vocabularySet = new Set()
  
  documents.forEach(doc => {
    const words = doc.split(' ').filter(word => word.length > 0)
    words.forEach(word => vocabularySet.add(word))
  })
  
  return Array.from(vocabularySet).sort()
}

/**
 * Create term frequency map for a document
 * @param {string} text - Text string
 * @returns {Map} - Map of word -> frequency
 */
export const getTermFrequency = (text) => {
  const words = text.split(' ').filter(word => word.length > 0)
  const termFreq = new Map()
  
  words.forEach(word => {
    termFreq.set(word, (termFreq.get(word) || 0) + 1)
  })
  
  return termFreq
}

/**
 * Calculate inverse document frequency for each term
 * @param {string[]} documents - Array of documents
 * @returns {Map} - Map of term -> IDF score
 */
export const calculateIDF = (documents) => {
  const totalDocs = documents.length
  const documentFrequency = new Map()
  
  // Count how many documents contain each term
  documents.forEach(doc => {
    const uniqueWords = new Set(doc.split(' ').filter(word => word.length > 0))
    uniqueWords.forEach(word => {
      documentFrequency.set(word, (documentFrequency.get(word) || 0) + 1)
    })
  })
  
  // Calculate IDF for each term
  const idfMap = new Map()
  documentFrequency.forEach((docCount, term) => {
    // IDF = log(total_documents / documents_containing_term)
    idfMap.set(term, Math.log(totalDocs / docCount))
  })
  
  return idfMap
}

/**
 * Convert text to TF-IDF vector
 * @param {string} text - Text to vectorize
 * @param {string[]} vocabulary - Complete vocabulary
 * @param {Map} idfMap - IDF scores for terms
 * @returns {number[]} - TF-IDF vector
 */
export const textToTFIDFVector = (text, vocabulary, idfMap) => {
  const termFreq = getTermFrequency(text)
  const vector = []
  
  vocabulary.forEach(term => {
    const tf = termFreq.get(term) || 0
    const idf = idfMap.get(term) || 0
    vector.push(tf * idf)
  })
  
  return vector
}

/**
 * Convert text to simple frequency vector (Bag of Words)
 * @param {string} text - Text to vectorize
 * @param {string[]} vocabulary - Complete vocabulary
 * @returns {number[]} - Frequency vector
 */
export const textToFrequencyVector = (text, vocabulary) => {
  const termFreq = getTermFrequency(text)
  const vector = []
  
  vocabulary.forEach(term => {
    vector.push(termFreq.get(term) || 0)
  })
  
  return vector
}

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} vectorA - First vector
 * @param {number[]} vectorB - Second vector
 * @returns {number} - Similarity score (0 to 1)
 */
export const cosineSimilarity = (vectorA, vectorB) => {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length')
  }
  
  if (vectorA.length === 0) {
    return 0
  }
  
  // Calculate dot product
  let dotProduct = 0
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i]
  }
  
  // Calculate magnitudes
  let magnitudeA = 0
  let magnitudeB = 0
  for (let i = 0; i < vectorA.length; i++) {
    magnitudeA += vectorA[i] * vectorA[i]
    magnitudeB += vectorB[i] * vectorB[i]
  }
  magnitudeA = Math.sqrt(magnitudeA)
  magnitudeB = Math.sqrt(magnitudeB)
  
  // Avoid division by zero
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }
  
  // Return cosine similarity
  return dotProduct / (magnitudeA * magnitudeB)
}

/**
 * Calculate Jaccard similarity between two texts
 * Simple alternative similarity metric
 * @param {string} textA - First text
 * @param {string} textB - Second text
 * @returns {number} - Similarity score (0 to 1)
 */
export const jaccardSimilarity = (textA, textB) => {
  const wordsA = new Set(textA.split(' ').filter(w => w.length > 0))
  const wordsB = new Set(textB.split(' ').filter(w => w.length > 0))
  
  const intersection = new Set([...wordsA].filter(x => wordsB.has(x)))
  const union = new Set([...wordsA, ...wordsB])
  
  if (union.size === 0) {
    return 0
  }
  
  return intersection.size / union.size
}

/**
 * Normalize a vector (make it unit length)
 * @param {number[]} vector - Input vector
 * @returns {number[]} - Normalized vector
 */
export const normalizeVector = (vector) => {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0))
  
  if (magnitude === 0) {
    return vector.map(() => 0)
  }
  
  return vector.map(val => val / magnitude)
}
