import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


interface InterviewQuestionProps {
  questionData: {
    category: string;
    difficulty: "easy" | "medium" | "hard";
    hint: string;
    question: string;
    time_limit_minutes: number;
  };
}

export function InterviewQuestionCard({ questionData }: InterviewQuestionProps) {
    console.log(questionData)
  const { category, difficulty, hint, question, time_limit_minutes } = questionData;

  // Color mapping for difficulty
  const difficultyColor = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  

  return (
    <Card className="w-full max-w-xl mx-auto my-4 shadow-lg border">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-lg font-semibold">{question}</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="uppercase">{category}</Badge>
          <Badge className={`${difficultyColor[difficulty]} uppercase`}>{difficulty}</Badge>
          <Badge variant="outline">{time_limit_minutes} min</Badge>
        </div>
      </CardHeader>
      <CardContent className="mt-2">
        <p className="text-sm text-muted-foreground">{hint}</p>
      </CardContent>
    
    </Card>
  );
}

export default InterviewQuestionCard
