/**
 * FAQ Dataset
 * Contains common question-and-answer pairs organized by category
 * Part 2: FAQ Data Collection
 * Part 10: FAQ Dataset Expansion & Question Coverage
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
    answer: 'I can help you with general questions, technical support, account management, billing inquiries, feature information, and privacy concerns. Feel free to ask anything!',
  },
  {
    id: 4,
    category: 'General',
    question: 'Who created this chatbot?',
    answer: 'This FAQ Chatbot was created as a CodeAlpha project to demonstrate natural language processing and intelligent question matching capabilities.',
  },
  {
    id: 5,
    category: 'General',
    question: 'What languages does this chatbot support?',
    answer: 'Currently, this chatbot supports English. Multi-language support is planned for future releases.',
  },
  {
    id: 6,
    category: 'General',
    question: 'Can this chatbot learn from conversations?',
    answer: 'This is a rule-based FAQ chatbot that matches questions to predefined answers. It uses cosine similarity for intelligent matching but does not learn from conversations.',
  },
  {
    id: 7,
    category: 'General',
    question: 'Is this chatbot available 24/7?',
    answer: 'Yes! This chatbot is available 24/7 to answer your frequently asked questions instantly, providing immediate assistance whenever you need it.',
  },

  // Account Related
  {
    id: 8,
    category: 'Account',
    question: 'How do I create an account?',
    answer: 'To create an account, click on the "Sign Up" button on the homepage, fill in your details including email and password, and verify your email address.',
  },
  {
    id: 9,
    category: 'Account',
    question: 'How can I reset my password?',
    answer: 'To reset your password, click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email.',
  },
  {
    id: 10,
    category: 'Account',
    question: 'I forgot my password. What should I do?',
    answer: 'Click on "Forgot Password" on the login page, enter your registered email address, and you will receive a password reset link. Follow the link to create a new password.',
  },
  {
    id: 11,
    category: 'Account',
    question: 'How do I change my email address?',
    answer: 'You can change your email address by going to Account Settings, clicking on "Email", entering your new email, and verifying it through the confirmation link.',
  },
  {
    id: 12,
    category: 'Account',
    question: 'Can I delete my account?',
    answer: 'Yes, you can delete your account by going to Account Settings, selecting "Delete Account", and confirming your decision. Please note this action is irreversible.',
  },
  {
    id: 13,
    category: 'Account',
    question: 'How do I update my profile information?',
    answer: 'Go to Account Settings, click on "Profile", and you can update your name, bio, profile picture, and other personal information. Don\'t forget to save your changes.',
  },
  {
    id: 14,
    category: 'Account',
    question: 'Can I have multiple accounts?',
    answer: 'Each person should have only one account. Multiple accounts may violate our Terms of Service. If you need separate workspaces, consider our team plans.',
  },
  {
    id: 15,
    category: 'Account',
    question: 'How do I verify my email address?',
    answer: 'After signing up, check your email for a verification link. Click the link to verify your account. If you didn\'t receive it, check your spam folder or request a new verification email.',
  },
  {
    id: 16,
    category: 'Account',
    question: 'What should I do if my account is locked?',
    answer: 'Accounts may be locked after multiple failed login attempts for security. Wait 30 minutes and try again, or contact support for immediate assistance.',
  },
  {
    id: 17,
    category: 'Account',
    question: 'Can I change my username?',
    answer: 'Yes, you can change your username once every 30 days from Account Settings. Choose a unique username that hasn\'t been taken by another user.',
  },

  // Technical Support
  {
    id: 18,
    category: 'Technical',
    question: 'The application is not loading. What should I do?',
    answer: 'Try refreshing your browser, clearing your cache, or checking your internet connection. If the problem persists, please contact our support team.',
  },
  {
    id: 19,
    category: 'Technical',
    question: 'The app is slow. How can I fix this?',
    answer: 'Slow performance can be caused by poor internet connection, outdated browser, or too many open tabs. Try closing unnecessary tabs, updating your browser, or restarting your device.',
  },
  {
    id: 20,
    category: 'Technical',
    question: 'Which browsers are supported?',
    answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, please keep your browser updated.',
  },
  {
    id: 21,
    category: 'Technical',
    question: 'Is there a mobile app available?',
    answer: 'Currently, we offer a mobile-responsive web application that works great on all devices. Native mobile apps for iOS and Android are planned for future release.',
  },
  {
    id: 22,
    category: 'Technical',
    question: 'How do I report a bug?',
    answer: 'You can report bugs by contacting our support team through the "Help" section or by sending an email to support@example.com with details about the issue.',
  },
  {
    id: 23,
    category: 'Technical',
    question: 'Why am I getting an error message?',
    answer: 'Error messages can occur for various reasons. Take note of the error code or message, try refreshing the page, and if it persists, contact support with the error details.',
  },
  {
    id: 24,
    category: 'Technical',
    question: 'How do I clear my browser cache?',
    answer: 'In most browsers, press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac), select "Cached images and files", choose a time range, and click "Clear data".',
  },
  {
    id: 25,
    category: 'Technical',
    question: 'Does this work offline?',
    answer: 'No, this application requires an internet connection to function. All data is stored securely in the cloud.',
  },
  {
    id: 26,
    category: 'Technical',
    question: 'What are the system requirements?',
    answer: 'You need a modern web browser (Chrome, Firefox, Safari, or Edge), stable internet connection, and JavaScript enabled. No additional software installation required.',
  },
  {
    id: 27,
    category: 'Technical',
    question: 'How do I enable JavaScript?',
    answer: 'JavaScript is usually enabled by default. Check your browser settings under Privacy & Security or Content Settings to ensure JavaScript is enabled for our site.',
  },

  // Billing & Pricing
  {
    id: 28,
    category: 'Billing',
    question: 'How much does it cost?',
    answer: 'We offer various pricing plans including a free tier. Visit our Pricing page to see detailed information about features and costs for each plan.',
  },
  {
    id: 29,
    category: 'Billing',
    question: 'What is the pricing?',
    answer: 'Our pricing starts with a free plan for basic use. Paid plans range from $9.99/month for individual users to custom enterprise pricing. Check our Pricing page for details.',
  },
  {
    id: 30,
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans.',
  },
  {
    id: 31,
    category: 'Billing',
    question: 'Can I get a refund?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with our service, contact support within 30 days of purchase for a full refund.',
  },
  {
    id: 32,
    category: 'Billing',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription anytime from your Account Settings under "Billing". Your access will continue until the end of the current billing period.',
  },
  {
    id: 33,
    category: 'Billing',
    question: 'When will I be charged?',
    answer: 'You will be charged on the day you subscribe and then on the same date each billing period (monthly or annually) until you cancel.',
  },
  {
    id: 34,
    category: 'Billing',
    question: 'Can I upgrade my plan?',
    answer: 'Yes! You can upgrade your plan anytime from Account Settings. You\'ll be charged a prorated amount for the remainder of the billing period.',
  },
  {
    id: 35,
    category: 'Billing',
    question: 'Do you offer discounts?',
    answer: 'We offer discounts for annual subscriptions (save up to 20%), educational institutions, non-profits, and volume purchases. Contact sales for custom quotes.',
  },
  {
    id: 36,
    category: 'Billing',
    question: 'Where can I view my invoices?',
    answer: 'All your invoices are available in Account Settings under "Billing History". You can download them as PDF files for your records.',
  },
  {
    id: 37,
    category: 'Billing',
    question: 'What happens if my payment fails?',
    answer: 'We\'ll retry the payment and send you an email notification. Update your payment method within 7 days to avoid service interruption.',
  },

  // Features & Usage
  {
    id: 38,
    category: 'Features',
    question: 'What features are included in the free plan?',
    answer: 'The free plan includes basic features such as limited storage, standard support, and access to core functionality. Upgrade to premium for unlimited access.',
  },
  {
    id: 39,
    category: 'Features',
    question: 'What is included in the premium plan?',
    answer: 'Premium plans include unlimited storage, priority support, advanced features, team collaboration, custom integrations, and no ads. See our Pricing page for full details.',
  },
  {
    id: 40,
    category: 'Features',
    question: 'Can I export my data?',
    answer: 'Yes, you can export your data in various formats (CSV, JSON, PDF) from the Settings menu under "Data Management".',
  },
  {
    id: 41,
    category: 'Features',
    question: 'Is my data secure?',
    answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest, and we follow industry best practices to protect your information.',
  },
  {
    id: 42,
    category: 'Features',
    question: 'Can I collaborate with my team?',
    answer: 'Yes, our premium plans include team collaboration features. You can invite team members, assign roles, and work together on projects.',
  },
  {
    id: 43,
    category: 'Features',
    question: 'Do you offer customer support?',
    answer: 'Yes, we offer email support for all users. Premium users get priority support and access to live chat during business hours.',
  },
  {
    id: 44,
    category: 'Features',
    question: 'Can I integrate with other tools?',
    answer: 'Yes, we offer integrations with popular tools like Slack, Google Drive, Dropbox, and more. API access is available on enterprise plans.',
  },
  {
    id: 45,
    category: 'Features',
    question: 'Is there an API available?',
    answer: 'Yes, we provide a RESTful API for enterprise customers. API documentation and access credentials are available in your developer settings.',
  },
  {
    id: 46,
    category: 'Features',
    question: 'Can I customize the interface?',
    answer: 'Premium users can customize colors, logos, and certain interface elements. Full white-labeling is available for enterprise customers.',
  },
  {
    id: 47,
    category: 'Features',
    question: 'How much storage do I get?',
    answer: 'Free users get 1GB storage, Pro users get 100GB, and Enterprise users get unlimited storage. Storage can be expanded with add-ons.',
  },
  {
    id: 48,
    category: 'Features',
    question: 'What file types are supported?',
    answer: 'We support common file types including documents (PDF, DOCX), images (JPG, PNG, GIF), spreadsheets (XLSX, CSV), and more.',
  },
  {
    id: 49,
    category: 'Features',
    question: 'Can I share files with others?',
    answer: 'Yes, you can share files and folders with team members or external collaborators via secure links with customizable permissions.',
  },

  // Getting Started
  {
    id: 50,
    category: 'Getting Started',
    question: 'How do I get started?',
    answer: 'Getting started is easy! Create an account, complete the onboarding tutorial, and start using the application right away.',
  },
  {
    id: 51,
    category: 'Getting Started',
    question: 'Is there a tutorial available?',
    answer: 'Yes, we have comprehensive tutorials and documentation available in our Help Center. You can also watch video guides on our YouTube channel.',
  },
  {
    id: 52,
    category: 'Getting Started',
    question: 'Do I need to install anything?',
    answer: 'No installation is required. Our application is web-based and works directly in your browser. Just sign up and start using it.',
  },
  {
    id: 53,
    category: 'Getting Started',
    question: 'How long does setup take?',
    answer: 'Setup takes just a few minutes! Create your account, verify your email, and you can start using the platform immediately.',
  },
  {
    id: 54,
    category: 'Getting Started',
    question: 'Where can I find help documentation?',
    answer: 'Our Help Center has comprehensive documentation, video tutorials, and FAQs. Access it from the main menu or visit help.example.com.',
  },
  {
    id: 55,
    category: 'Getting Started',
    question: 'Can I import my existing data?',
    answer: 'Yes, you can import data from CSV, Excel, or JSON files. Go to Settings > Data Import and follow the step-by-step import wizard.',
  },
  {
    id: 56,
    category: 'Getting Started',
    question: 'What is the first thing I should do?',
    answer: 'After creating your account, complete your profile, watch the quick start tutorial, and explore the dashboard to familiarize yourself with the features.',
  },

  // Privacy & Security
  {
    id: 57,
    category: 'Privacy',
    question: 'How do you handle my personal information?',
    answer: 'We respect your privacy and handle your personal information according to our Privacy Policy. We never sell your data to third parties.',
  },
  {
    id: 58,
    category: 'Privacy',
    question: 'Where can I find the terms of service?',
    answer: 'Our Terms of Service can be found at the bottom of our website or in your Account Settings. Please review them to understand your rights and obligations.',
  },
  {
    id: 59,
    category: 'Privacy',
    question: 'Is my data encrypted?',
    answer: 'Yes, all data is encrypted using industry-standard AES-256 encryption both in transit (SSL/TLS) and at rest. Your security is our top priority.',
  },
  {
    id: 60,
    category: 'Privacy',
    question: 'Who can see my data?',
    answer: 'Only you and team members you explicitly share with can see your data. Our staff can only access your data with your permission for support purposes.',
  },
  {
    id: 61,
    category: 'Privacy',
    question: 'Do you comply with GDPR?',
    answer: 'Yes, we are fully GDPR compliant. You have the right to access, modify, or delete your personal data at any time.',
  },
  {
    id: 62,
    category: 'Privacy',
    question: 'Can I request my data to be deleted?',
    answer: 'Yes, you can request complete data deletion by contacting support. We will delete all your personal data within 30 days as per GDPR requirements.',
  },
  {
    id: 63,
    category: 'Privacy',
    question: 'Where is my data stored?',
    answer: 'Your data is stored in secure, SOC 2 certified data centers with redundant backups. We use Amazon Web Services (AWS) with servers in multiple regions.',
  },
  {
    id: 64,
    category: 'Privacy',
    question: 'Do you use cookies?',
    answer: 'Yes, we use essential cookies for authentication and functionality, and optional cookies for analytics with your consent. You can manage cookie preferences in Settings.',
  },
  {
    id: 65,
    category: 'Privacy',
    question: 'How do I enable two-factor authentication?',
    answer: 'Enable two-factor authentication in Account Settings under Security. You can use SMS, authenticator apps, or hardware security keys for added protection.',
  },

  // Contact & Support
  {
    id: 66,
    category: 'Contact',
    question: 'How do I contact support?',
    answer: 'Contact support via email at support@example.com, through the in-app chat widget, or by submitting a ticket in the Help Center.',
  },
  {
    id: 67,
    category: 'Contact',
    question: 'What are your support hours?',
    answer: 'Email support is available 24/7. Live chat support is available Monday-Friday, 9 AM - 6 PM EST. Premium users get 24/7 priority support.',
  },
  {
    id: 68,
    category: 'Contact',
    question: 'How quickly will I get a response?',
    answer: 'We typically respond to support emails within 24 hours. Premium users receive priority support with responses within 4 hours during business hours.',
  },
  {
    id: 69,
    category: 'Contact',
    question: 'Do you offer phone support?',
    answer: 'Phone support is available for enterprise customers. Contact your account manager for the dedicated support line.',
  },
  {
    id: 70,
    category: 'Contact',
    question: 'Where is your company located?',
    answer: 'Our headquarters is located in San Francisco, California, USA. We have team members working remotely worldwide.',
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
