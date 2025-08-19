import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Question } from "./types";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | number | null;
  onAnswerSelect: (answer: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}: QuestionCardProps) => {
  const progress = (questionNumber / totalQuestions) * 100;

  const getSectionColor = (category: string) => {
    switch (category) {
      case 'psychometric': return 'text-primary';
      case 'technical': return 'text-info';
      case 'wiscar': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getSectionName = (category: string) => {
    switch (category) {
      case 'psychometric': return 'Psychometric Evaluation';
      case 'technical': return 'Technical & Aptitude';
      case 'wiscar': return 'WISCAR Framework';
      default: return category;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className={getSectionColor(question.category)}>
            {getSectionName(question.category)}
          </span>
          <span>Question {questionNumber} of {totalQuestions}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
          {question.scenario && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border-l-4 border-primary/50">
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {question.scenario}
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Answer Options */}
          <RadioGroup
            value={selectedAnswer?.toString() || ""}
            onValueChange={(value) => {
              const answer = question.type === 'multiple-choice' || question.type === 'scenario' 
                ? parseInt(value) 
                : value;
              onAnswerSelect(answer);
            }}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem 
                  value={question.type === 'multiple-choice' || question.type === 'scenario' ? index.toString() : option} 
                  id={`option-${index}`} 
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer leading-relaxed"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoPrevious}
            >
              Previous
            </Button>
            <Button
              onClick={onNext}
              disabled={!canGoNext || selectedAnswer === null}
              className="bg-gradient-to-r from-primary to-primary-hover"
            >
              {questionNumber === totalQuestions ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;