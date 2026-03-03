import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { ArrowLeft, Download, Loader, AlertCircle } from "lucide-react";
import { MCQSet } from "@shared/api";
import PDFExport from "@/components/PDFExport";

export default function AdminMCQDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mcqSet, setMcqSet] = useState<MCQSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPDFModal, setShowPDFModal] = useState(false);

  useEffect(() => {
    fetchMCQSet();
  }, [id]);

  const fetchMCQSet = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`/api/mcq-sets/${id}`);
      if (!response.ok) throw new Error("Failed to fetch MCQ set");
      const data = await response.json();
      setMcqSet(data.set);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch MCQ set");
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Loader className="h-8 w-8 text-primary animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !mcqSet) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              onClick={() => navigate("/admin/mcq")}
              variant="ghost"
              className="mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to MCQ Sets
            </Button>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6 flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error || "MCQ set not found"}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Button
            onClick={() => navigate("/admin/mcq")}
            variant="ghost"
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to MCQ Sets
          </Button>

          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  {mcqSet.title}
                </h1>
                <p className="text-foreground/70 mt-2 text-lg">{mcqSet.topic}</p>
              </div>
              <Badge className={`h-fit ${getDifficultyColor(mcqSet.difficulty)}`}>
                {mcqSet.difficulty.charAt(0).toUpperCase() +
                  mcqSet.difficulty.slice(1)}
              </Badge>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-4">
                  <p className="text-xs text-foreground/70 mb-1">Questions</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mcqSet.questions.length}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-4">
                  <p className="text-xs text-foreground/70 mb-1">Created</p>
                  <p className="text-sm font-bold text-foreground">
                    {new Date(mcqSet.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-4">
                  <p className="text-xs text-foreground/70 mb-1">Last Updated</p>
                  <p className="text-sm font-bold text-foreground">
                    {new Date(mcqSet.updatedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-4">
                  <Button
                    onClick={() => setShowPDFModal(true)}
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-white text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {mcqSet.questions.map((question, index) => (
              <Card key={question.id} className="border-primary/20 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">
                    Question {index + 1}
                  </CardTitle>
                  <p className="text-foreground mt-2 text-base font-semibold">
                    {question.question}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {question.options.map((option, optIndex) => {
                    const isCorrect = option.id === question.correctOptionId;
                    return (
                      <div
                        key={option.id}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          isCorrect
                            ? "border-green-500 bg-green-50"
                            : "border-primary/20 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold text-sm ${
                              isCorrect
                                ? "bg-green-500 text-white"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}
                          </div>
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                isCorrect
                                  ? "text-green-700 font-semibold"
                                  : "text-foreground"
                              }`}
                            >
                              {option.text}
                            </p>
                            {isCorrect && (
                              <p className="text-xs text-green-600 mt-1">
                                ✓ Correct Answer
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Export Modal */}
      <PDFExport
        open={showPDFModal}
        onOpenChange={setShowPDFModal}
        mcqSet={mcqSet}
      />
    </Layout>
  );
}
