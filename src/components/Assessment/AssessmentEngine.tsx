import { useState, useCallback } from "react";
import { AssessmentState, AssessmentResults as ResultsType } from "./types";
import { assessmentQuestions } from "./questions";
import AssessmentIntro from "./AssessmentIntro";
import QuestionCard from "./QuestionCard";
import AssessmentResultsComponent from "./AssessmentResults";

const AssessmentEngine = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'intro',
    currentQuestionIndex: 0,
    answers: {},
    scores: {
      psychometric: 0,
      technical: 0,
      wiscar: {
        will: 0,
        interest: 0,
        skill: 0,
        cognitive: 0,
        ability: 0,
        realWorld: 0
      }
    },
    startTime: new Date(),
    timeSpent: 0
  });

  const calculateScores = useCallback((answers: Record<string, any>): ResultsType => {
    let psychometricTotal = 0;
    let psychometricCount = 0;
    let technicalTotal = 0;
    let technicalCount = 0;
    
    const wiscarScores = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };
    const wiscarCounts = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    };

    // Calculate scores based on answers
    assessmentQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer === undefined || answer === null) return;

      let score = 0;
      const weight = question.weight || 1;

      if (question.type === 'likert') {
        // Likert scale: convert to percentage (0-100)
        const likertValue = typeof answer === 'string' ? 
          ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].indexOf(answer) :
          answer;
        score = (likertValue / 4) * 100;
      } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
        if (question.correctAnswer !== undefined && question.correctAnswer !== null) {
          // Has correct answer
          score = answer === question.correctAnswer ? 100 : 0;
        } else {
          // No correct answer (e.g., skill level questions)
          if (question.subcategory === 'skill') {
            // Convert skill level to score
            score = (answer / (question.options!.length - 1)) * 100;
          } else {
            // Personal preference questions
            score = 70; // Neutral score for preference questions
          }
        }
      }

      // Apply weight
      score *= weight;

      // Assign to appropriate category
      if (question.category === 'psychometric') {
        psychometricTotal += score;
        psychometricCount += weight;
      } else if (question.category === 'technical') {
        technicalTotal += score;
        technicalCount += weight;
      } else if (question.category === 'wiscar' && question.subcategory) {
        const subcategory = question.subcategory as keyof typeof wiscarScores;
        if (subcategory in wiscarScores) {
          wiscarScores[subcategory] += score;
          wiscarCounts[subcategory] += weight;
        }
      }
    });

    // Calculate final scores
    const psychometricScore = psychometricCount > 0 ? Math.round(psychometricTotal / psychometricCount) : 0;
    const technicalScore = technicalCount > 0 ? Math.round(technicalTotal / technicalCount) : 0;

    // Calculate WISCAR scores
    Object.keys(wiscarScores).forEach(key => {
      const k = key as keyof typeof wiscarScores;
      if (wiscarCounts[k] > 0) {
        wiscarScores[k] = Math.round(wiscarScores[k] / wiscarCounts[k]);
      }
    });

    // Calculate overall score
    const wiscarAverage = Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6;
    const overallScore = Math.round((psychometricScore + technicalScore + wiscarAverage) / 3);

    // Determine recommendation
    let recommendation: 'Yes' | 'Maybe' | 'No' = 'No';
    let confidenceLevel = 0;

    if (overallScore >= 80) {
      recommendation = 'Yes';
      confidenceLevel = Math.min(95, 75 + (overallScore - 80) / 2);
    } else if (overallScore >= 60) {
      recommendation = 'Maybe';
      confidenceLevel = Math.min(85, 60 + (overallScore - 60) / 2);
    } else {
      recommendation = 'No';
      confidenceLevel = Math.min(75, 40 + overallScore / 3);
    }

    // Generate insights
    const insights: string[] = [];
    if (psychometricScore >= 80) {
      insights.push("Strong psychological fit for AML work - you have the right mindset and motivation");
    }
    if (technicalScore >= 80) {
      insights.push("Excellent technical foundation - you understand AML concepts and can apply them effectively");
    }
    if (wiscarScores.will >= 80) {
      insights.push("Outstanding persistence and dedication - crucial for complex investigations");
    }
    if (technicalScore < 60) {
      insights.push("Focus on building technical AML knowledge and regulatory understanding");
    }
    if (psychometricScore < 60) {
      insights.push("Consider whether the detail-oriented, compliance-focused nature of AML work aligns with your preferences");
    }

    // Generate action plan
    const actionPlan: string[] = [];
    if (recommendation === 'Yes') {
      actionPlan.push("Begin with advanced AML certification programs");
      actionPlan.push("Seek entry-level AML analyst positions");
      actionPlan.push("Practice with real-world case studies and transaction monitoring");
    } else if (recommendation === 'Maybe') {
      if (technicalScore < 70) {
        actionPlan.push("Complete AML fundamentals training course");
        actionPlan.push("Study regulatory frameworks (FATF, BSA, KYC requirements)");
      }
      if (psychometricScore < 70) {
        actionPlan.push("Shadow AML professionals to understand daily responsibilities");
        actionPlan.push("Assess your comfort level with detailed, rule-based work");
      }
      actionPlan.push("Gain experience with data analysis and Excel/SQL skills");
    } else {
      actionPlan.push("Explore foundational compliance or finance courses");
      actionPlan.push("Consider related fields like fraud detection or audit");
      actionPlan.push("Develop analytical and attention-to-detail skills");
    }

    // Career suggestions
    const careerSuggestions: string[] = [];
    if (recommendation === 'Yes' || recommendation === 'Maybe') {
      if (wiscarScores.cognitive >= 75) {
        careerSuggestions.push("Financial Crime Investigator");
      }
      if (wiscarScores.skill >= 70) {
        careerSuggestions.push("AML Analyst/Specialist");
      }
      careerSuggestions.push("KYC/Customer Due Diligence Officer");
      if (psychometricScore >= 75) {
        careerSuggestions.push("Compliance Officer (AML-focused)");
      }
    }

    // Alternative paths
    const alternativePaths: string[] = [];
    if (recommendation === 'No' || (recommendation === 'Maybe' && overallScore < 65)) {
      alternativePaths.push("Fraud Detection Specialist");
      alternativePaths.push("Compliance Documentation Specialist");
      alternativePaths.push("Financial Data Analyst");
      alternativePaths.push("Risk Assessment Coordinator");
    }

    return {
      overallScore,
      psychometricScore,
      technicalScore,
      wiscarScores,
      recommendation,
      confidenceLevel: Math.round(confidenceLevel),
      insights,
      actionPlan,
      careerSuggestions,
      alternativePaths
    };
  }, []);

  const handleStart = () => {
    setState(prev => ({
      ...prev,
      currentSection: 'psychometric',
      startTime: new Date()
    }));
  };

  const handleAnswerSelect = (questionId: string, answer: string | number) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const handleNext = () => {
    setState(prev => {
      const newIndex = prev.currentQuestionIndex + 1;
      
      if (newIndex >= assessmentQuestions.length) {
        // Assessment complete
        const results = calculateScores(prev.answers);
        return {
          ...prev,
          currentSection: 'results',
          timeSpent: Date.now() - prev.startTime.getTime(),
          scores: {
            psychometric: results.psychometricScore,
            technical: results.technicalScore,
            wiscar: results.wiscarScores
          }
        };
      }
      
      return {
        ...prev,
        currentQuestionIndex: newIndex
      };
    });
  };

  const handlePrevious = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1)
    }));
  };

  const handleRestart = () => {
    setState({
      currentSection: 'intro',
      currentQuestionIndex: 0,
      answers: {},
      scores: {
        psychometric: 0,
        technical: 0,
        wiscar: {
          will: 0,
          interest: 0,
          skill: 0,
          cognitive: 0,
          ability: 0,
          realWorld: 0
        }
      },
      startTime: new Date(),
      timeSpent: 0
    });
  };

  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStart={handleStart} />;
  }

  if (state.currentSection === 'results') {
    const results = calculateScores(state.answers);
    return <AssessmentResultsComponent results={results} onRestart={handleRestart} />;
  }

  const currentQuestion = assessmentQuestions[state.currentQuestionIndex];
  const selectedAnswer = state.answers[currentQuestion.id];

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={state.currentQuestionIndex + 1}
      totalQuestions={assessmentQuestions.length}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion.id, answer)}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={selectedAnswer !== undefined && selectedAnswer !== null}
      canGoPrevious={state.currentQuestionIndex > 0}
    />
  );
};

export default AssessmentEngine;