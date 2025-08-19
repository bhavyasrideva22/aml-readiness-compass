import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AssessmentResults as ResultsType } from "./types";
import { 
  TrophyIcon, 
  Target, 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Brain,
  Heart,
  Wrench,
  Lightbulb,
  Globe
} from "lucide-react";

interface AssessmentResultsProps {
  results: ResultsType;
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'text-success bg-success/10 border-success/20';
      case 'Maybe': return 'text-warning bg-warning/10 border-warning/20';
      case 'No': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return CheckCircle;
      case 'Maybe': return AlertCircle;
      case 'No': return Target;
      default: return AlertCircle;
    }
  };

  const wiscarIcons = {
    will: Heart,
    interest: Target,
    skill: Wrench,
    cognitive: Brain,
    ability: Lightbulb,
    realWorld: Globe
  };

  const wiscarLabels = {
    will: 'Will & Persistence',
    interest: 'Interest & Passion',
    skill: 'Current Skills',
    cognitive: 'Cognitive Readiness',
    ability: 'Ability to Learn',
    realWorld: 'Real-World Alignment'
  };

  const RecommendationIcon = getRecommendationIcon(results.recommendation);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <TrophyIcon className="w-8 h-8 text-warning" />
          <h1 className="text-4xl font-bold">Assessment Complete!</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Here's your comprehensive AML Specialist readiness analysis
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className={`border-2 ${getRecommendationColor(results.recommendation)}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <RecommendationIcon className="w-6 h-6" />
            Final Recommendation: {results.recommendation}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">
              {results.overallScore}%
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-1">Overall Readiness Score</div>
              <Progress value={results.overallScore} className="h-3" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {results.confidenceLevel}% Confidence
            </Badge>
          </div>
          
          {results.insights.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Key Insights:</h4>
              <ul className="space-y-1">
                {results.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-primary">{results.psychometricScore}%</div>
              <Progress value={results.psychometricScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Personality, motivation, and interest alignment
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-info" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-info">{results.technicalScore}%</div>
              <Progress value={results.technicalScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Domain knowledge and analytical abilities
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-success" />
              WISCAR Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-success">
                {Math.round(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}%
              </div>
              <Progress 
                value={Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6} 
                className="h-2" 
              />
              <p className="text-sm text-muted-foreground">
                Comprehensive readiness framework
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>WISCAR Framework Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.wiscarScores).map(([key, value]) => {
              const IconComponent = wiscarIcons[key as keyof typeof wiscarIcons];
              const label = wiscarLabels[key as keyof typeof wiscarLabels];
              
              return (
                <div key={key} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{label}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Career Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Careers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.careerSuggestions.map((career, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>{career}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Your Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.actionPlan.map((action, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm">{action}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alternative Paths */}
      {results.alternativePaths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Alternative Career Paths to Consider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.alternativePaths.map((path, index) => (
                <Badge key={index} variant="outline" className="p-3 justify-start">
                  {path}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="text-center space-y-4">
        <Button 
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="px-8"
        >
          Take Assessment Again
        </Button>
        <p className="text-sm text-muted-foreground">
          Share your results or save them for future reference
        </p>
      </div>
    </div>
  );
};

export default AssessmentResults;