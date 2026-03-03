import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Calendar,
  BookOpen,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function StudentDashboard() {
  const recentActivities = [
    {
      id: 1,
      title: "HSC Biology Batch",
      date: "Today at 5:00 PM",
      status: "upcoming",
      type: "Class",
    },
    {
      id: 2,
      title: "Cell Biology Quiz",
      date: "Completed on Mar 15",
      status: "completed",
      type: "Assessment",
    },
    {
      id: 3,
      title: "Study Materials Upload",
      date: "2 days ago",
      status: "available",
      type: "Resources",
    },
  ];

  const stats = [
    { label: "Attendance", value: "94%", icon: Calendar, color: "text-green-600" },
    { label: "Total Courses", value: "3", icon: BookOpen, color: "text-blue-600" },
    { label: "Completed Tests", value: "12", icon: CheckCircle, color: "text-purple-600" },
    { label: "Average Score", value: "87%", icon: TrendingUp, color: "text-orange-600" },
  ];

  const upcomingClasses = [
    {
      id: 1,
      course: "HSC Biology",
      date: "Today",
      time: "5:00 PM - 7:00 PM",
      instructor: "Prof. Dr. Rahman Ahmed",
      topic: "Cell Division & Genetics",
    },
    {
      id: 2,
      course: "Medical Entrance Prep",
      date: "Tomorrow",
      time: "6:00 PM - 8:00 PM",
      instructor: "Prof. Dr. Rahman Ahmed",
      topic: "Human Physiology",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-foreground/70">Welcome back! Here's your learning overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="border-primary/20 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground/70 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <Icon className={`h-10 w-10 ${stat.color} opacity-20`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Classes */}
            <div className="lg:col-span-2">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Classes</CardTitle>
                    <Link to="/student/panel">
                      <Button variant="ghost" size="sm">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="border border-primary/20 rounded-lg p-4 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{cls.course}</h4>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {cls.date}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-2">{cls.topic}</p>
                      <div className="flex items-center justify-between text-sm text-foreground/60">
                        <span>{cls.time}</span>
                        <span>{cls.instructor}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Links */}
            <div>
              <Card className="border-primary/20 bg-white h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/student/attendance">
                    <Button variant="outline" className="w-full justify-start text-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      Check Attendance
                    </Button>
                  </Link>
                  <Link to="/student/exam">
                    <Button variant="outline" className="w-full justify-start text-foreground">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Results
                    </Button>
                  </Link>
                  <Link to="/student/materials">
                    <Button variant="outline" className="w-full justify-start text-foreground">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Study Materials
                    </Button>
                  </Link>
                  <Link to="/student/fee">
                    <Button variant="outline" className="w-full justify-start text-foreground">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Fee Status
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activities */}
          <Card className="mt-8 border-primary/20 bg-white">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-primary/10 last:border-0">
                    <div className={`h-3 w-3 rounded-full mt-2 ${
                      activity.status === "completed" ? "bg-green-600" :
                      activity.status === "upcoming" ? "bg-blue-600" : "bg-orange-600"
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{activity.title}</h4>
                      <p className="text-sm text-foreground/70">{activity.date}</p>
                      <span className="text-xs text-foreground/60">{activity.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
