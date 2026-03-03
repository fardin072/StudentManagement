import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, PlayCircle } from "lucide-react";

export default function StudentMCQ() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const mcqSets = [
    {
      id: 1,
      title: "Cell Biology - Basic MCQs",
      topic: "Cell Structure & Function",
      questions: 50,
      difficulty: "easy",
      completed: true,
      bestScore: 45,
      attempts: 3,
    },
    {
      id: 2,
      title: "Genetics - Advanced Concepts",
      topic: "Heredity & Evolution",
      questions: 75,
      difficulty: "medium",
      completed: true,
      bestScore: 68,
      attempts: 2,
    },
    {
      id: 3,
      title: "Human Physiology - Challenge",
      topic: "Body Systems",
      questions: 100,
      difficulty: "hard",
      completed: false,
      bestScore: 0,
      attempts: 0,
    },
    {
      id: 4,
      title: "Ecology - Ecosystem MCQs",
      topic: "Biodiversity",
      questions: 60,
      difficulty: "medium",
      completed: true,
      bestScore: 52,
      attempts: 1,
    },
    {
      id: 5,
      title: "Biochemistry - Pathways",
      topic: "Metabolic Routes",
      questions: 80,
      difficulty: "hard",
      completed: false,
      bestScore: 0,
      attempts: 0,
    },
    {
      id: 6,
      title: "Plant Physiology Basics",
      topic: "Plant Functions",
      questions: 40,
      difficulty: "easy",
      completed: true,
      bestScore: 38,
      attempts: 1,
    },
  ];

  const filteredMCQs =
    selectedDifficulty === "all"
      ? mcqSets
      : mcqSets.filter((mcq) => mcq.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-orange-100 text-orange-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/student/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">MCQ Practice</h1>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["all", "easy", "medium", "hard"].map((level) => (
              <Button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={
                  selectedDifficulty === level
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white border border-primary/20 text-foreground hover:bg-primary/5"
                }
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>

          {/* MCQ Sets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMCQs.map((mcq) => (
              <Card
                key={mcq.id}
                className={`border-primary/20 hover:shadow-lg transition-shadow ${
                  mcq.completed ? "bg-white" : "bg-orange-50 border-orange-600/20"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg mb-1">
                        {mcq.title}
                      </h4>
                      <p className="text-sm text-foreground/70">{mcq.topic}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(mcq.difficulty)}`}>
                      {mcq.difficulty.charAt(0).toUpperCase() + mcq.difficulty.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/70">Total Questions</span>
                      <span className="font-semibold text-foreground">{mcq.questions}</span>
                    </div>

                    {mcq.completed && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/70">Best Score</span>
                          <span className="font-semibold text-primary">
                            {mcq.bestScore}/{mcq.questions}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/70">Attempts</span>
                          <span className="font-semibold text-foreground">{mcq.attempts}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {mcq.completed ? (
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Retake Quiz
                    </Button>
                  ) : (
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Card */}
          <Card className="mt-12 border-blue-600/20 bg-blue-50">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-800 mb-2">
                <strong>How to use MCQ Practice:</strong>
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Start with easy level questions to build confidence</li>
                <li>• Practice regularly to improve your speed and accuracy</li>
                <li>• Review wrong answers to understand concepts better</li>
                <li>• Challenge yourself with hard questions before exams</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
