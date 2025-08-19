import { Question } from './types';

export const assessmentQuestions: Question[] = [
  // Psychometric Evaluation Questions
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I enjoy analyzing financial documents and data for patterns and anomalies.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.2
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I am naturally detail-oriented and rarely miss small inconsistencies.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.3
  },
  {
    id: 'psych_3',
    type: 'scenario',
    category: 'psychometric',
    subcategory: 'ethical',
    question: 'You notice a colleague consistently approving high-risk transactions without proper documentation. What would you do?',
    scenario: 'During your review of recent transactions, you observe that a team member has been approving several high-value, cross-border transfers without completing the required enhanced due diligence checks.',
    options: [
      'Ignore it as it\'s not your responsibility',
      'Discuss it informally with the colleague first',
      'Report it immediately to your supervisor',
      'Document everything and escalate through proper channels'
    ],
    correctAnswer: 3,
    weight: 1.5
  },
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I find regulatory compliance work intellectually stimulating.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.1
  },
  {
    id: 'psych_5',
    type: 'multiple-choice',
    category: 'psychometric',
    subcategory: 'cognitive',
    question: 'When faced with complex problems, I prefer to:',
    options: [
      'Break them down into systematic, logical steps',
      'Brainstorm creative solutions quickly',
      'Consult with others for diverse perspectives',
      'Research best practices and follow established procedures'
    ],
    correctAnswer: 0,
    weight: 1.2
  },

  // Technical & Aptitude Questions
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'domain-knowledge',
    question: 'What does KYC stand for in AML compliance?',
    options: [
      'Keep Your Cash',
      'Know Your Customer',
      'Key Yield Calculation',
      'Knowledge Yielding Compliance'
    ],
    correctAnswer: 1,
    weight: 1.0
  },
  {
    id: 'tech_2',
    type: 'scenario',
    category: 'technical',
    subcategory: 'pattern-recognition',
    question: 'Which transaction pattern is MOST suspicious for potential money laundering?',
    scenario: 'You are reviewing the following transaction patterns from different customers:',
    options: [
      'Regular monthly salary deposits of $5,000',
      'Multiple cash deposits just under $10,000 followed by immediate wire transfers',
      'Weekly grocery store purchases of $150-200',
      'Quarterly tax payments of varying amounts'
    ],
    correctAnswer: 1,
    weight: 1.4
  },
  {
    id: 'tech_3',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'regulatory',
    question: 'What is the primary purpose of a Suspicious Activity Report (SAR)?',
    options: [
      'To track customer preferences',
      'To report potential money laundering or fraud to authorities',
      'To document all large transactions',
      'To maintain customer credit scores'
    ],
    correctAnswer: 1,
    weight: 1.3
  },
  {
    id: 'tech_4',
    type: 'scenario',
    category: 'technical',
    subcategory: 'numerical',
    question: 'A customer deposits $9,800 in cash on Monday, $9,900 on Wednesday, and $9,850 on Friday. What should you do?',
    scenario: 'You notice a customer making frequent cash deposits just below the $10,000 reporting threshold.',
    options: [
      'Nothing, as all deposits are under $10,000',
      'File a Currency Transaction Report (CTR)',
      'Investigate for potential structuring and consider filing a SAR',
      'Close the account immediately'
    ],
    correctAnswer: 2,
    weight: 1.5
  },
  {
    id: 'tech_5',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'tools',
    question: 'Which of these is commonly used for transaction monitoring in AML?',
    options: [
      'Microsoft Excel only',
      'Actimize or similar AML software',
      'Basic accounting software',
      'Social media monitoring tools'
    ],
    correctAnswer: 1,
    weight: 1.1
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I can maintain focus during long, detailed investigations lasting several hours.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.2
  },
  {
    id: 'wiscar_will_2',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'will',
    question: 'You\'ve been working on a complex case for weeks with no clear resolution. How do you proceed?',
    scenario: 'You\'re investigating a potential money laundering network, but after three weeks of analysis, you still haven\'t found definitive evidence.',
    options: [
      'Close the case as inconclusive',
      'Continue investigating with fresh approaches and additional resources',
      'Pass it to someone else',
      'Focus on easier cases instead'
    ],
    correctAnswer: 1,
    weight: 1.3
  },
  {
    id: 'wiscar_interest_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I actively read about financial crime trends and regulatory updates in my spare time.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.2
  },
  {
    id: 'wiscar_skill_1',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'How would you rate your current Excel/data analysis skills?',
    options: [
      'Basic (can create simple spreadsheets)',
      'Intermediate (pivot tables, basic formulas)',
      'Advanced (complex formulas, macros, data visualization)',
      'Expert (VBA, advanced analytics, automation)'
    ],
    correctAnswer: null, // No correct answer, scored differently
    weight: 1.0
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'Given the following transaction data, what pattern concerns you most?',
    scenario: 'Customer A: 50 deposits of $1,000 each over 2 months\nCustomer B: 1 deposit of $50,000 from overseas\nCustomer C: 10 deposits ranging from $8,000-$9,900 in one week',
    options: [
      'Customer A - too many small deposits',
      'Customer B - large overseas transfer',
      'Customer C - potential structuring pattern',
      'All patterns are normal'
    ],
    correctAnswer: 2,
    weight: 1.4
  },
  {
    id: 'wiscar_ability_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'I adapt quickly when new AML regulations or procedures are introduced.',
    options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    weight: 1.1
  },
  {
    id: 'wiscar_real_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'realWorld',
    question: 'In a typical day as an AML Specialist, which activity would you find most engaging?',
    scenario: 'Your daily responsibilities include various AML-related tasks.',
    options: [
      'Reviewing automated system alerts for false positives',
      'Researching complex customer relationships and ownership structures',
      'Writing detailed investigation reports for regulators',
      'Training colleagues on new compliance procedures'
    ],
    correctAnswer: null, // Personal preference, no correct answer
    weight: 1.0
  }
];

export const getQuestionsByCategory = (category: string) => {
  return assessmentQuestions.filter(q => q.category === category);
};

export const getQuestionsBySubcategory = (subcategory: string) => {
  return assessmentQuestions.filter(q => q.subcategory === subcategory);
};