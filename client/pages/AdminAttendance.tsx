import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

export default function AdminAttendance() {
  const [selectedBatch, setSelectedBatch] = useState("hsc");

  const batches = [
    { id: "hsc", name: "HSC Biology" },
    { id: "medical", name: "Medical Entrance" },
    { id: "ssc", name: "SSC Biology" },
  ];

  const attendanceRecords = {
    hsc: [
      {
        id: 1,
        date: "Mar 20, 2025",
        totalPresent: 42,
        totalAbsent: 3,
        percentage: 93.33,
      },
      {
        id: 2,
        date: "Mar 18, 2025",
        totalPresent: 44,
        totalAbsent: 1,
        percentage: 97.78,
      },
      {
        id: 3,
        date: "Mar 16, 2025",
        totalPresent: 43,
        totalAbsent: 2,
        percentage: 95.56,
      },
    ],
    medical: [
      {
        id: 1,
        date: "Mar 21, 2025",
        totalPresent: 36,
        totalAbsent: 2,
        percentage: 94.74,
      },
      {
        id: 2,
        date: "Mar 20, 2025",
        totalPresent: 35,
        totalAbsent: 3,
        percentage: 92.11,
      },
    ],
    ssc: [
      {
        id: 1,
        date: "Mar 22, 2025",
        totalPresent: 40,
        totalAbsent: 2,
        percentage: 95.24,
      },
    ],
  };

  const currentData =
    attendanceRecords[selectedBatch as keyof typeof attendanceRecords];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/admin/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">
              Attendance Management
            </h1>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Record Attendance
            </Button>
          </div>

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

          {/* Attendance Records */}
          <div className="space-y-4">
            {currentData.map((record) => (
              <Card key={record.id} className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground text-lg">
                      {record.date}
                    </h3>
                    <span className="text-sm font-bold text-primary">
                      {record.percentage}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Present</p>
                      <p className="text-2xl font-bold text-green-600">
                        {record.totalPresent}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Absent</p>
                      <p className="text-2xl font-bold text-red-600">
                        {record.totalAbsent}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">Rate</p>
                      <p className="text-2xl font-bold text-primary">
                        {record.percentage}%
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-primary/20 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${record.percentage}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">
                  Average Attendance
                </p>
                <p className="text-3xl font-bold text-primary">95%</p>
              </CardContent>
            </Card>
            <Card className="border-green-600/20 bg-green-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Highest Rate</p>
                <p className="text-3xl font-bold text-green-600">97.78%</p>
              </CardContent>
            </Card>
            <Card className="border-orange-600/20 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Lowest Rate</p>
                <p className="text-3xl font-bold text-orange-600">92.11%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
