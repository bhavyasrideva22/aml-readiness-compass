import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Eye, Users, BookOpen, Target } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  const keyTraits = [
    { icon: Eye, title: "Analytical Thinking", description: "Pattern recognition and data analysis" },
    { icon: Shield, title: "Attention to Detail", description: "Spotting anomalies in complex data" },
    { icon: BookOpen, title: "Regulatory Knowledge", description: "Understanding AML frameworks (FATF, BSA, KYC)" },
    { icon: TrendingUp, title: "Tech Proficiency", description: "AML software and analytics tools" },
    { icon: Target, title: "Ethical Integrity", description: "Strong moral compass and confidentiality" },
    { icon: Users, title: "Communication", description: "Clear reporting to stakeholders" }
  ];

  const careerPaths = [
    "AML Analyst / Specialist",
    "KYC/Customer Due Diligence Officer", 
    "Financial Crime Investigator",
    "Compliance Officer (AML-focused)",
    "Fraud Risk Analyst"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
          Are You Ready to Become an AML Specialist?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Evaluate your readiness for a career in Anti-Money Laundering through our comprehensive, 
          multi-dimensional assessment designed by industry experts.
        </p>
      </div>

      {/* What the Role Involves */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            What Does an AML Specialist Do?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            An AML Specialist monitors and investigates financial activity to prevent money laundering 
            and finance-related crimes. You'll work with regulatory compliance, detect suspicious patterns, 
            and collaborate with legal teams and authorities to protect the financial system.
          </p>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card>
        <CardHeader>
          <CardTitle>Typical Career Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {careerPaths.map((career, index) => (
              <Badge key={index} variant="secondary" className="p-3 justify-start text-sm">
                {career}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Traits */}
      <Card>
        <CardHeader>
          <CardTitle>Key Traits & Skills for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyTraits.map((trait, index) => {
              const IconComponent = trait.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{trait.title}</h4>
                    <p className="text-sm text-muted-foreground">{trait.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Assessment Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Assessment Sections</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">20-25</div>
              <div className="text-sm text-muted-foreground">Minutes Duration</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">360°</div>
              <div className="text-sm text-muted-foreground">Comprehensive Analysis</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span><strong>Psychometric Evaluation:</strong> Interest, personality, motivation, and ethics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-info rounded-full"></div>
              <span><strong>Technical & Aptitude:</strong> Domain knowledge, reasoning, and problem-solving</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span><strong>WISCAR Framework:</strong> Will, Interest, Skill, Cognitive ability, Ability to learn, Real-world alignment</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <div className="text-center">
        <Button 
          onClick={onStart}
          size="lg" 
          className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary transition-all duration-300"
        >
          Start Assessment
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          Get personalized insights and career guidance based on your results
        </p>
      </div>
    </div>
  );
};

export default AssessmentIntro;