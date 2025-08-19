export interface Question {
  id: string;
  type: 'multiple-choice' | 'likert' | 'scenario' | 'ranking';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  question: string;
  options?: string[];
  scenario?: string;
  correctAnswer?: string | number;
  weight?: number;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  answers: Record<string, any>;
  scores: {
    psychometric: number;
    technical: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
    };
  };
  startTime: Date;
  timeSpent: number;
}

export interface AssessmentResults {
  overallScore: number;
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  recommendation: 'Yes' | 'Maybe' | 'No';
  confidenceLevel: number;
  insights: string[];
  actionPlan: string[];
  careerSuggestions: string[];
  alternativePaths: string[];
}