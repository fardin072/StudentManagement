import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, AlertCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface MCQSet {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number; // in minutes
}

const mcqSets: { [key: string]: MCQSet } = {
  cell_basics: {
    id: "cell_basics",
    title: "Cell Biology - Basics",
    timeLimit: 10,
    questions: [
      {
        id: 1,
        question: "Which organelle is responsible for energy production in the cell?",
        options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi apparatus"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What is the primary function of the cell membrane?",
        options: [
          "To protect the cell and regulate what enters/exits",
          "To produce energy",
          "To store genetic material",
          "To synthesize proteins",
        ],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "Which of the following is not a component of the cell?",
        options: ["Nucleus", "Photosynthesis", "Mitochondria", "Ribosome"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "What is the function of ribosomes?",
        options: ["Protein synthesis", "Energy production", "DNA replication", "Photosynthesis"],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: "Which part of the cell controls cellular activities?",
        options: ["Nucleus", "Cytoplasm", "Cell wall", "Vacuole"],
        correctAnswer: 0,
      },
    ],
  },
};

export default function StudentMCQExam() {
  const mcqId = "cell_basics";
  const mcq = mcqSets[mcqId];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(mcq.questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(mcq.timeLimit * 60);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Timer effect
  useEffect(() => {
    if (examSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setExamSubmitted(true);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const submitExam = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === mcq.questions[index].correctAnswer) {
        correctCount++;
      }
    });
    const percentage = (correctCount / mcq.questions.length) * 100;
    setScore(Math.round(percentage));
    setExamSubmitted(true);
  };

  const goToQuestion = (qIndex: number) => {
    setCurrentQuestion(qIndex);
  };

  if (examSubmitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/student/mcq"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to MCQ
            </Link>

            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="mb-6">
                  <div className="inline-flex h-24 w-24 bg-primary/10 rounded-full items-center justify-center">
                    <p className="text-5xl font-bold text-primary">{score}%</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Exam Completed!
                </h2>

                <div className="bg-primary/5 rounded-lg p-6 mb-8">
                  <p className="text-lg text-foreground mb-4">
                    Your Score: <span className="font-bold text-primary">{score}%</span>
                  </p>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <p>
                      Correct Answers:{" "}
                      <span className="font-bold text-foreground">
                        {answers.filter(
                          (ans, idx) => ans === mcq.questions[idx].correctAnswer
                        ).length}{" "}
                        out of {mcq.questions.length}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/student/mcq">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6">
                      Back to MCQ Practice
                    </Button>
                  </Link>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="w-full border-primary/20 text-foreground py-6"
                  >
                    Retake Exam
                  </Button>
                </div>

                {/* Answer Review */}
                <div className="mt-12 pt-8 border-t border-primary/20">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Answer Review
                  </h3>
                  <div className="space-y-4">
                    {mcq.questions.map((question, idx) => {
                      const isCorrect =
                        answers[idx] === question.correctAnswer;
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border ${
                            isCorrect
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <p className="font-semibold text-foreground mb-2">
                            Q{idx + 1}. {question.question}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className="text-foreground/70">
                              Your answer:{" "}
                              <span
                                className={`font-semibold ${
                                  isCorrect
                                    ? "text-green-700"
                                    : "text-red-700"
                                }`}
                              >
                                {answers[idx] !== null
                                  ? question.options[answers[idx]]
                                  : "Not answered"}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-foreground/70">
                                Correct answer:{" "}
                                <span className="font-semibold text-green-700">
                                  {question.options[question.correctAnswer]}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  const question = mcq.questions[currentQuestion];
  const isTimeWarning = timeLeft < 60;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{mcq.title}</h1>
              <p className="text-foreground/70 mt-1">
                Question {currentQuestion + 1} of {mcq.questions.length}
              </p>
            </div>
            <div
              className={`text-center px-4 py-3 rounded-lg border-2 ${
                isTimeWarning
                  ? "bg-orange-50 border-orange-600"
                  : "bg-primary/10 border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2 justify-center">
                <Clock className={`h-5 w-5 ${isTimeWarning ? "text-orange-600" : "text-primary"}`} />
                <span className={`text-2xl font-bold ${isTimeWarning ? "text-orange-600" : "text-primary"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              {isTimeWarning && (
                <p className="text-xs text-orange-700 mt-1">Time running out!</p>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-primary/20 rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / mcq.questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-primary/20 bg-white mb-8">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {question.question}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[currentQuestion] === idx
                        ? "border-primary bg-primary/10"
                        : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === idx
                            ? "border-primary bg-primary"
                            : "border-primary/30"
                        }`}
                      >
                        {answers[currentQuestion] === idx && (
                          <div className="h-3 w-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span
                        className={`font-semibold ${
                          answers[currentQuestion] === idx
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between gap-4 mb-8">
            <Button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-primary/20 text-foreground"
            >
              Previous
            </Button>

            {currentQuestion < mcq.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={submitExam}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Exam
              </Button>
            )}
          </div>

          {/* Question Navigator */}
          <Card className="border-primary/20 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Questions Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {mcq.questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToQuestion(idx)}
                    className={`h-10 rounded-lg font-semibold text-sm transition-all ${
                      currentQuestion === idx
                        ? "bg-primary text-white scale-110"
                        : answers[idx] !== null
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-primary/10 text-foreground hover:bg-primary/20"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
