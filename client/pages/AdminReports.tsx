import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, TrendingUp } from "lucide-react";

export default function AdminReports() {
  const reportCategories = [
    {
      title: "Student Performance",
      description: "Detailed performance analytics for all students",
      icon: TrendingUp,
    },
    {
      title: "Attendance Report",
      description: "Monthly and yearly attendance statistics",
      icon: TrendingUp,
    },
    {
      title: "Revenue Report",
      description: "Financial reports and collection analytics",
      icon: TrendingUp,
    },
    {
      title: "Exam Analysis",
      description: "Question-wise and exam-wise detailed analysis",
      icon: TrendingUp,
    },
  ];

  const monthlyData = [
    { month: "January", revenue: "₹4,20,000", students: 235, attendance: "93%" },
    { month: "February", revenue: "₹4,15,000", students: 242, attendance: "94%" },
    { month: "March", revenue: "₹4,25,000", students: 248, attendance: "95%" },
  ];

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

          <h1 className="text-4xl font-bold text-foreground mb-8">
            Reports & Analytics
          </h1>

          {/* Report Categories */}
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Generate Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {reportCategories.map((report, idx) => {
              const Icon = report.icon;
              return (
                <Card
                  key={idx}
                  className="border-primary/20 bg-white hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="pt-6">
                    <div className="inline-flex h-12 w-12 bg-primary/10 rounded-lg items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      {report.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      {report.description}
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Monthly Analytics */}
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Monthly Overview
          </h2>
          <Card className="border-primary/20 bg-white">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Month
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Revenue
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Students
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Attendance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((data, idx) => (
                      <tr key={idx} className="border-b border-primary/10 hover:bg-primary/5">
                        <td className="py-3 px-4 font-semibold text-foreground">
                          {data.month}
                        </td>
                        <td className="py-3 px-4 text-primary font-bold">
                          {data.revenue}
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          {data.students}
                        </td>
                        <td className="py-3 px-4 text-green-600 font-semibold">
                          {data.attendance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <h2 className="text-2xl font-bold text-foreground mb-6 mt-12">
            Key Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-600/20 bg-green-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">
                  Growth Rate (Q1)
                </p>
                <p className="text-3xl font-bold text-green-600">↑ 5.5%</p>
                <p className="text-xs text-foreground/60 mt-2">
                  Student enrollment increased by 5.5%
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-600/20 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">
                  Revenue Growth
                </p>
                <p className="text-3xl font-bold text-blue-600">↑ ₹5,000</p>
                <p className="text-xs text-foreground/60 mt-2">
                  Monthly revenue increased from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-600/20 bg-purple-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">
                  Satisfaction Rate
                </p>
                <p className="text-3xl font-bold text-purple-600">4.8/5</p>
                <p className="text-xs text-foreground/60 mt-2">
                  Based on 124 student reviews
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
