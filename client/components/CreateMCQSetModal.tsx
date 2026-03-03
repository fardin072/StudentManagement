import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { CreateMCQSetRequest } from "@shared/api";

interface CreateMCQSetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateMCQSetRequest) => Promise<void>;
  isLoading?: boolean;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export default function CreateMCQSetModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: CreateMCQSetModalProps) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: 0,
    },
  ]);
  const [expandedQuestion, setExpandedQuestion] = useState<string>("q1");
  const [error, setError] = useState("");

  const addQuestion = () => {
    const newId = `q${questions.length + 1}`;
    setQuestions([
      ...questions,
      {
        id: newId,
        question: "",
        options: ["", "", "", ""],
        correctOptionIndex: 0,
      },
    ]);
    setExpandedQuestion(newId);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, question: text } : q))
    );
  };

  const updateOption = (questionId: string, optionIndex: number, text: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = text;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const setCorrectOption = (questionId: string, optionIndex: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, correctOptionIndex: optionIndex };
        }
        return q;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!topic.trim()) {
      setError("Topic is required");
      return;
    }

    const hasEmptyQuestions = questions.some(
      (q) => !q.question.trim() || q.options.some((opt) => !opt.trim())
    );

    if (hasEmptyQuestions) {
      setError("All questions and options must be filled");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        topic: topic.trim(),
        difficulty,
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options,
          correctOptionIndex: q.correctOptionIndex,
        })),
      });

      // Reset form
      setTitle("");
      setTopic("");
      setDifficulty("medium");
      setQuestions([
        {
          id: "q1",
          question: "",
          options: ["", "", "", ""],
          correctOptionIndex: 0,
        },
      ]);
      setExpandedQuestion("q1");
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create MCQ set");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create MCQ Set</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base font-semibold">
                MCQ Set Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Cell Biology Basics"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="topic" className="text-base font-semibold">
                Topic
              </Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Cell Structure"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="difficulty" className="text-base font-semibold">
                Difficulty Level
              </Label>
              <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Questions ({questions.length})</Label>
              <Button
                type="button"
                onClick={addQuestion}
                variant="outline"
                size="sm"
                className="border-primary/20"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Question
              </Button>
            </div>

            {questions.map((question, index) => (
              <Card
                key={question.id}
                className="border-primary/20"
              >
                <CardHeader
                  className="pb-3 cursor-pointer hover:bg-primary/5"
                  onClick={() =>
                    setExpandedQuestion(
                      expandedQuestion === question.id ? "" : question.id
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Question {index + 1}</CardTitle>
                    <div className="flex items-center gap-2">
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQuestion(question.id);
                          }}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                      {expandedQuestion === question.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {expandedQuestion === question.id && (
                  <CardContent className="space-y-4 border-t border-primary/10 pt-4">
                    {/* Question Text */}
                    <div>
                      <Label className="text-sm font-medium">Question Text</Label>
                      <Textarea
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, e.target.value)}
                        placeholder="Enter the question"
                        className="mt-2 min-h-20"
                      />
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Options</Label>
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex gap-3 items-start">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctOptionIndex === optIndex}
                            onChange={() => setCorrectOption(question.id, optIndex)}
                            className="mt-3 cursor-pointer"
                            title="Mark as correct answer"
                          />
                          <Input
                            value={option}
                            onChange={(e) =>
                              updateOption(question.id, optIndex, e.target.value)
                            }
                            placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                            className="flex-1"
                          />
                        </div>
                      ))}
                      <p className="text-xs text-foreground/60 mt-2">
                        Select the correct answer using the radio button
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Creating..." : "Create MCQ Set"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
