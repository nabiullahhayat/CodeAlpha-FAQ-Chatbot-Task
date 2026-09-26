/**
 * FAQ Dataset
 * Contains common question-and-answer pairs organized by category
 * Part 2: FAQ Data Collection
 */

export const faqData = [
  // General Information
  {
    id: 1,
    category: 'General',
    question: 'What is this chatbot?',
    answer: 'This is an FAQ Chatbot designed to help answer common questions. You can ask me anything from the FAQ list, and I will provide relevant answers.',
  },
  {
    id: 2,
    category: 'General',
    question: 'How does this chatbot work?',
    answer: 'The chatbot uses text preprocessing and similarity matching to find the most relevant answer to your question from the FAQ database.',
  },
  {
    id: 3,
    category: 'General',
    question: 'What can you help me with?',
    answer: 'I can help you with general questions, technical support, account management, and provide information about our services.',
  },

  // Account Related
  {
    id: 4,
    category: 'Account',
    question: 'How do I create an account?',
    answer: 'To create an account, click on the "Sign Up" button on the homepage, fill in your details including email and password, and verify your email address.',
  },
  {
    id: 5,
    category: 'Account',
    question: 'How can I reset my password?',
    answer: 'To reset your password, click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email.',
  },
  {
    id: 6,
    category: 'Account',
    question: 'How do I change my email address?',
    answer: 'You can change your email address by going to Account Settings, clicking on "Email", entering your new email, and verifying it through the confirmation link.',
  },
  {
    id: 7,
    category: 'Account',
    question: 'Can I delete my account?',
    answer: 'Yes, you can delete your account by going to Account Settings, selecting "Delete Account", and confirming your decision. Please note this action is irreversible.',
  },

  // Technical Support
  {
    id: 8,
    category: 'Technical',
    question: 'The application is not loading. What should I do?',
    answer: 'Try refreshing your browser, clearing your cache, or checking your internet connection. If the problem persists, please contact our support team.',
  },
  {
    id: 9,
    category: 'Technical',
    question: 'Which browsers are supported?',
    answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, please keep your browser updated.',
  },
  {
    id: 10,
    category: 'Technical',
    question: 'Is there a mobile app available?',
    answer: 'Currently, we offer a mobile-responsive web application. Native mobile apps for iOS and Android are planned for future release.',
  },
  {
    id: 11,
    category: 'Technical',
    question: 'How do I report a bug?',
    answer: 'You can report bugs by contacting our support team through the "Help" section or by sending an email to support@example.com with details about the issue.',
  },

  // Billing & Pricing
  {
    id: 12,
    category: 'Billing',
    question: 'How much does it cost?',
    answer: 'We offer various pricing plans including a free tier. Visit our Pricing page to see detailed information about features and costs for each plan.',
  },
  {
    id: 13,
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans.',
  },
  {
    id: 14,
    category: 'Billing',
    question: 'Can I get a refund?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with our service, contact support within 30 days of purchase for a full refund.',
  },
  {
    id: 15,
    category: 'Billing',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription anytime from your Account Settings under "Billing". Your access will continue until the end of the current billing period.',
  },

  // Features & Usage
  {
    id: 16,
    category: 'Features',
    question: 'What features are included in the free plan?',
    answer: 'The free plan includes basic features such as limited storage, standard support, and access to core functionality. Upgrade to premium for unlimited access.',
  },
  {
    id: 17,
    category: 'Features',
    question: 'Can I export my data?',
    answer: 'Yes, you can export your data in various formats (CSV, JSON, PDF) from the Settings menu under "Data Management".',
  },
  {
    id: 18,
    category: 'Features',
    question: 'Is my data secure?',
    answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest, and we follow industry best practices to protect your information.',
  },
  {
    id: 19,
    category: 'Features',
    question: 'Can I collaborate with my team?',
    answer: 'Yes, our premium plans include team collaboration features. You can invite team members, assign roles, and work together on projects.',
  },
  {
    id: 20,
    category: 'Features',
    question: 'Do you offer customer support?',
    answer: 'Yes, we offer email support for all users. Premium users get priority support and access to live chat during business hours.',
  },

  // Getting Started
  {
    id: 21,
    category: 'Getting Started',
    question: 'How do I get started?',
    answer: 'Getting started is easy! Create an account, complete the onboarding tutorial, and start using the application right away.',
  },
  {
    id: 22,
    category: 'Getting Started',
    question: 'Is there a tutorial available?',
    answer: 'Yes, we have comprehensive tutorials and documentation available in our Help Center. You can also watch video guides on our YouTube channel.',
  },
  {
    id: 23,
    category: 'Getting Started',
    question: 'Do I need to install anything?',
    answer: 'No installation is required. Our application is web-based and works directly in your browser. Just sign up and start using it.',
  },

  // Privacy & Terms
  {
    id: 24,
    category: 'Privacy',
    question: 'How do you handle my personal information?',
    answer: 'We respect your privacy and handle your personal information according to our Privacy Policy. We never sell your data to third parties.',
  },
  {
    id: 25,
    category: 'Privacy',
    question: 'Where can I find the terms of service?',
    answer: 'Our Terms of Service can be found at the bottom of our website or in your Account Settings. Please review them to understand your rights and obligations.',
  },
]

/**
 * Get all FAQs
 */
export const getAllFAQs = () => {
  return faqData
}

/**
 * Get FAQs by category
 */
export const getFAQsByCategory = (category) => {
  return faqData.filter(faq => faq.category === category)
}

/**
 * Get all unique categories
 */
export const getCategories = () => {
  return [...new Set(faqData.map(faq => faq.category))]
}

/**
 * Get FAQ by ID
 */
export const getFAQById = (id) => {
  return faqData.find(faq => faq.id === id)
}

/**
 * Get total FAQ count
 */
export const getFAQCount = () => {
  return faqData.length
}
