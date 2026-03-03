import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Eye,
  AlertCircle,
  Loader,
} from "lucide-react";
import CreateMCQSetModal from "@/components/CreateMCQSetModal";
import { MCQSet, CreateMCQSetRequest } from "@shared/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminMCQ() {
  const navigate = useNavigate();
  const [mcqSets, setMcqSets] = useState<MCQSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch MCQ sets on component mount
  useEffect(() => {
    fetchMCQSets();
  }, []);

  const fetchMCQSets = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/mcq-sets");
      if (!response.ok) throw new Error("Failed to fetch MCQ sets");
      const data = await response.json();
      setMcqSets(data.sets || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch MCQ sets");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMCQSet = async (data: CreateMCQSetRequest) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/mcq-sets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create MCQ set");
      await fetchMCQSets();
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to create MCQ set"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMCQSet = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/mcq-sets/${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete MCQ set");
      await fetchMCQSets();
      setDeleteId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete MCQ set");
    } finally {
      setIsDeleting(false);
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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/admin/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">MCQ Management</h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create MCQ Set
            </Button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}

          {/* Empty state */}
          {!loading && mcqSets.length === 0 && (
            <Card className="border-primary/20 bg-white text-center py-12">
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  No MCQ sets created yet
                </p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Create Your First MCQ Set
                </Button>
              </CardContent>
            </Card>
          )}

          {/* MCQ Grid */}
          {!loading && mcqSets.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {mcqSets.map((mcq) => (
                <Card key={mcq.id} className="border-primary/20 bg-white">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{mcq.title}</CardTitle>
                        <p className="text-sm text-foreground/70 mt-1">
                          {mcq.topic}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(
                          mcq.difficulty
                        )}`}
                      >
                        {mcq.difficulty.charAt(0).toUpperCase() +
                          mcq.difficulty.slice(1)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-primary/5 rounded-lg p-3">
                        <p className="text-xs text-foreground/70 mb-1">
                          Questions
                        </p>
                        <p className="font-bold text-foreground text-lg">
                          {mcq.questions.length}
                        </p>
                      </div>
                      <div className="bg-primary/5 rounded-lg p-3">
                        <p className="text-xs text-foreground/70 mb-1">
                          Created
                        </p>
                        <p className="font-bold text-foreground text-sm">
                          {new Date(mcq.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-primary/10">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => navigate(`/admin/mcq/${mcq.id}`)}
                          variant="outline"
                          className="flex-1 border-primary/20 text-foreground hover:bg-primary/5"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-primary/20 text-foreground hover:bg-primary/5"
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => setDeleteId(mcq.id)}
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Stats */}
          {!loading && mcqSets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/70 mb-2">
                    Total MCQ Sets
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {mcqSets.length}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/70 mb-2">
                    Total Questions
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {mcqSets.reduce((sum, set) => sum + set.questions.length, 0)}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/70 mb-2">
                    Difficulty Distribution
                  </p>
                  <p className="text-sm text-foreground">
                    Easy: {mcqSets.filter((s) => s.difficulty === "easy").length} |
                    Medium: {mcqSets.filter((s) => s.difficulty === "medium").length} |
                    Hard: {mcqSets.filter((s) => s.difficulty === "hard").length}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Create MCQ Set Modal */}
      <CreateMCQSetModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateMCQSet}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete MCQ Set?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The MCQ set and all its questions will
              be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteMCQSet}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
