import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function StudentAttendance() {
  const [selectedBatch, setSelectedBatch] = useState("hsc");

  const batches = [
    { id: "hsc", name: "HSC Biology (XI-XII)" },
    { id: "medical", name: "Medical Entrance Prep" },
    { id: "competitive", name: "Competitive Exam Coaching" },
  ];

  const attendanceData = {
    hsc: [
      { id: 1, date: "Mar 20, 2025", topic: "Cell Biology", status: "present" },
      { id: 2, date: "Mar 18, 2025", topic: "Genetics", status: "present" },
      { id: 3, date: "Mar 16, 2025", topic: "Evolution", status: "absent" },
      { id: 4, date: "Mar 14, 2025", topic: "Ecology", status: "present" },
      { id: 5, date: "Mar 12, 2025", topic: "Human Physiology", status: "present" },
      { id: 6, date: "Mar 10, 2025", topic: "Plant Physiology", status: "present" },
      { id: 7, date: "Mar 8, 2025", topic: "Biochemistry", status: "present" },
      { id: 8, date: "Mar 6, 2025", topic: "Molecular Biology", status: "leave" },
    ],
    medical: [
      { id: 1, date: "Mar 21, 2025", topic: "Human Anatomy", status: "present" },
      { id: 2, date: "Mar 19, 2025", topic: "Physiology", status: "present" },
      { id: 3, date: "Mar 17, 2025", topic: "Biochemistry", status: "present" },
    ],
    competitive: [
      { id: 1, date: "Mar 22, 2025", topic: "General Science", status: "present" },
      { id: 2, date: "Mar 20, 2025", topic: "Environmental Science", status: "present" },
    ],
  };

  const currentData = attendanceData[selectedBatch as keyof typeof attendanceData];
  const totalClasses = currentData.length;
  const presentDays = currentData.filter((d) => d.status === "present").length;
  const percentage = Math.round((presentDays / totalClasses) * 100);

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

          <h1 className="text-4xl font-bold text-foreground mb-8">Attendance View</h1>

          {/* Batch Selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {batches.map((batch) => (
              <Button
                key={batch.id}
                onClick={() => setSelectedBatch(batch.id)}
                className={
                  selectedBatch === batch.id
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white border border-primary/20 text-foreground hover:bg-primary/5"
                }
              >
                {batch.name}
              </Button>
            ))}
          </div>

          {/* Attendance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-1">Attendance Percentage</p>
                <p className="text-4xl font-bold text-primary mb-2">{percentage}%</p>
                <div className="w-full bg-primary/20 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-600/20 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Present</p>
                    <p className="text-3xl font-bold text-green-600">{presentDays}</p>
                  </div>
                  <CheckCircle className="h-12 w-12 text-green-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-600/20 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Absent/Leave</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {totalClasses - presentDays}
                    </p>
                  </div>
                  <AlertCircle className="h-12 w-12 text-orange-600 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Records */}
          <Card className="border-primary/20 bg-white">
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentData.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {record.status === "present" ? (
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      ) : record.status === "absent" ? (
                        <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{record.topic}</p>
                        <p className="text-sm text-foreground/60">{record.date}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        record.status === "present"
                          ? "bg-green-100 text-green-700"
                          : record.status === "absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Card className="mt-8 border-blue-600/20 bg-blue-50">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Minimum 75% attendance is required to appear in final exams.
                If your attendance falls below this, please contact your instructor.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
