import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Download } from "lucide-react";

export default function StudentExam() {
  const [activeTab, setActiveTab] = useState("results");

  const examResults = [
    {
      id: 1,
      name: "Cell Biology Quiz",
      date: "Mar 15, 2025",
      totalMarks: 100,
      obtainedMarks: 87,
      percentage: 87,
      duration: "1 hour",
      status: "completed",
    },
    {
      id: 2,
      name: "Genetics Mid-Term",
      date: "Mar 10, 2025",
      totalMarks: 100,
      obtainedMarks: 92,
      percentage: 92,
      duration: "2 hours",
      status: "completed",
    },
    {
      id: 3,
      name: "Evolution Assessment",
      date: "Feb 28, 2025",
      totalMarks: 100,
      obtainedMarks: 78,
      percentage: 78,
      duration: "1.5 hours",
      status: "completed",
    },
    {
      id: 4,
      name: "Ecology Test",
      date: "Feb 20, 2025",
      totalMarks: 100,
      obtainedMarks: 85,
      percentage: 85,
      duration: "1 hour",
      status: "completed",
    },
  ];

  const upcomingExams = [
    {
      id: 1,
      name: "Human Physiology Exam",
      date: "Mar 25, 2025",
      time: "5:00 PM - 7:00 PM",
      totalMarks: 100,
      duration: "2 hours",
      status: "scheduled",
    },
    {
      id: 2,
      name: "Plant Physiology Quiz",
      date: "Mar 28, 2025",
      time: "6:00 PM - 7:00 PM",
      totalMarks: 50,
      duration: "1 hour",
      status: "scheduled",
    },
  ];

  const averageScore = Math.round(
    examResults.reduce((sum, exam) => sum + exam.percentage, 0) / examResults.length
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/student/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Exam & Results</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-1">Average Score</p>
                <p className="text-4xl font-bold text-primary">{averageScore}%</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-1">Exams Completed</p>
                <p className="text-4xl font-bold text-green-600">{examResults.length}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-1">Upcoming Exams</p>
                <p className="text-4xl font-bold text-orange-600">{upcomingExams.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-primary/20">
            <button
              onClick={() => setActiveTab("results")}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                activeTab === "results"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Results
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                activeTab === "upcoming"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Upcoming
            </button>
          </div>

          {/* Results Tab */}
          {activeTab === "results" && (
            <div className="space-y-4">
              {examResults.map((exam) => (
                <Card key={exam.id} className="border-primary/20 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {exam.name}
                        </h4>
                        <p className="text-sm text-foreground/60">{exam.date}</p>
                      </div>
                      <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                        Completed
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">Duration</p>
                        <p className="font-semibold text-foreground">{exam.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">Total Marks</p>
                        <p className="font-semibold text-foreground">{exam.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">Your Score</p>
                        <p className="font-semibold text-primary">
                          {exam.obtainedMarks}/{exam.totalMarks}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-semibold text-foreground">
                          Score Percentage
                        </p>
                        <p className="text-sm font-bold text-primary">{exam.percentage}%</p>
                      </div>
                      <div className="w-full bg-primary/20 rounded-full h-3">
                        <div
                          className="bg-primary h-3 rounded-full"
                          style={{ width: `${exam.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Result
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Upcoming Tab */}
          {activeTab === "upcoming" && (
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <Card key={exam.id} className="border-orange-600/20 bg-orange-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {exam.name}
                        </h4>
                        <p className="text-sm text-foreground/60">
                          {exam.date} at {exam.time}
                        </p>
                      </div>
                      <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full">
                        Scheduled
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">Duration</p>
                        <p className="font-semibold text-foreground">{exam.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">Total Marks</p>
                        <p className="font-semibold text-foreground">{exam.totalMarks}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">Status</p>
                        <p className="font-semibold text-orange-700">Upcoming</p>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Study Materials
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
