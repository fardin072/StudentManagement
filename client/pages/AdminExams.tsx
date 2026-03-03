import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminExams() {
  const exams = [
    {
      id: 1,
      title: "Cell Biology Quiz",
      batch: "HSC Biology",
      date: "Mar 25, 2025",
      totalMarks: 100,
      questions: 50,
      submissions: 42,
      status: "scheduled",
    },
    {
      id: 2,
      title: "Genetics Mid-Term",
      batch: "HSC Biology",
      date: "Mar 20, 2025",
      totalMarks: 100,
      questions: 60,
      submissions: 45,
      status: "completed",
    },
    {
      id: 3,
      title: "Human Physiology Exam",
      batch: "Medical Entrance",
      date: "Mar 22, 2025",
      totalMarks: 150,
      questions: 75,
      submissions: 35,
      status: "ongoing",
    },
    {
      id: 4,
      title: "Ecology Test",
      batch: "SSC Biology",
      date: "Mar 19, 2025",
      totalMarks: 100,
      questions: 40,
      submissions: 40,
      status: "completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "ongoing":
        return "bg-blue-100 text-blue-700";
      case "scheduled":
        return "bg-orange-100 text-orange-700";
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
            <h1 className="text-4xl font-bold text-foreground">Exam Management</h1>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
          </div>

          {/* Exams Table */}
          <Card className="border-primary/20 bg-white">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Exam Title
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Batch
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Date
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">
                        Questions
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">
                        Submissions
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Status
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => (
                      <tr key={exam.id} className="border-b border-primary/10 hover:bg-primary/5">
                        <td className="py-3 px-4 text-foreground font-semibold">
                          {exam.title}
                        </td>
                        <td className="py-3 px-4 text-foreground/70">{exam.batch}</td>
                        <td className="py-3 px-4 text-foreground/70">{exam.date}</td>
                        <td className="py-3 px-4 text-center font-semibold">
                          {exam.questions}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold">
                          {exam.submissions}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                              exam.status
                            )}`}
                          >
                            {exam.status.charAt(0).toUpperCase() +
                              exam.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:bg-primary/10"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Total Exams</p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </CardContent>
            </Card>
            <Card className="border-green-600/20 bg-green-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Completed</p>
                <p className="text-3xl font-bold text-green-600">8</p>
              </CardContent>
            </Card>
            <Card className="border-blue-600/20 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Ongoing</p>
                <p className="text-3xl font-bold text-blue-600">2</p>
              </CardContent>
            </Card>
            <Card className="border-orange-600/20 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Scheduled</p>
                <p className="text-3xl font-bold text-orange-600">2</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
