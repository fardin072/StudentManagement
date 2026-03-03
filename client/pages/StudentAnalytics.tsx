import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Target, Award } from "lucide-react";

export default function StudentAnalytics() {
  const performanceData = [
    { subject: "Cell Biology", score: 87, target: 90 },
    { subject: "Genetics", score: 92, target: 85 },
    { subject: "Ecology", score: 85, target: 80 },
    { subject: "Physiology", score: 78, target: 85 },
    { subject: "Biochemistry", score: 88, target: 90 },
  ];

  const progressMetrics = [
    {
      label: "Overall Performance",
      value: 86,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Improvement Rate",
      value: 4.5,
      unit: "%",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Consistency Score",
      value: 92,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const weakAreas = [
    { name: "Photosynthesis", recommendation: "Review chapter 5-6" },
    { name: "Protein Synthesis", recommendation: "Practice more MCQs" },
    { name: "Ecosystem Relations", recommendation: "Do practical exercises" },
  ];

  const strengths = [
    { name: "Genetics Concepts", confidence: 92 },
    { name: "Cell Division", confidence: 90 },
    { name: "Classification", confidence: 88 },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/student/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Performance Analytics</h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {progressMetrics.map((metric, idx) => (
              <Card key={idx} className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/70 mb-3">{metric.label}</p>
                  <div className="flex items-end gap-2">
                    <p className={`text-4xl font-bold ${metric.color}`}>
                      {metric.value}
                    </p>
                    {metric.unit && <p className={`text-lg ${metric.color}`}>{metric.unit}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subject Performance */}
            <div className="lg:col-span-2">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Subject-wise Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {performanceData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-foreground">{item.subject}</span>
                        <span className="text-sm text-primary font-bold">
                          {item.score}% / Target: {item.target}%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-primary/20 rounded-full h-3">
                          <div
                            className="bg-primary h-3 rounded-full"
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-orange-200 rounded-full h-3">
                          <div
                            className="bg-orange-600 h-3 rounded-full"
                            style={{ width: `${item.target}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Strength Areas */}
            <div>
              <Card className="border-green-600/20 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Strength Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {strengths.map((strength, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          {strength.name}
                        </span>
                        <span className="text-sm text-green-700 font-bold">
                          {strength.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${strength.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Weak Areas & Recommendations */}
          <Card className="mt-8 border-orange-600/20 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Target className="h-5 w-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weakAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-orange-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {area.name}
                        </h4>
                        <p className="text-sm text-foreground/70">
                          {area.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Growth Tips */}
          <Card className="mt-8 border-blue-600/20 bg-blue-50">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-blue-900 mb-3">
                Tips to Boost Your Performance:
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Focus on weak areas with dedicated study sessions</li>
                <li>✓ Practice more MCQs on topics where you score low</li>
                <li>✓ Review completed exams to understand mistakes</li>
                <li>✓ Set realistic targets and track progress weekly</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
