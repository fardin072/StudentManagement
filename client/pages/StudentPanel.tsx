import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Calendar,
  FileText,
  LogOut,
  Settings,
} from "lucide-react";

export default function StudentPanel() {
  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      description: "View your overview and recent activities",
      icon: BarChart3,
      path: "/student/dashboard",
    },
    {
      id: 2,
      title: "Attendance View",
      description: "Check your attendance records",
      icon: Calendar,
      path: "/student/attendance",
    },
    {
      id: 3,
      title: "Exam & Results",
      description: "View exam schedules and your results",
      icon: FileText,
      path: "/student/exam",
    },
    {
      id: 4,
      title: "Study Materials",
      description: "Access course materials and notes",
      icon: BookOpen,
      path: "/student/materials",
    },
    {
      id: 5,
      title: "Performance Analytics",
      description: "Track your learning progress",
      icon: BarChart3,
      path: "/student/analytics",
    },
    {
      id: 6,
      title: "MCQ Practice",
      description: "Practice with online multiple choice questions",
      icon: BookOpen,
      path: "/student/mcq",
    },
    {
      id: 7,
      title: "Fee Status",
      description: "Check your fee payment status",
      icon: FileText,
      path: "/student/fee",
    },
    {
      id: 8,
      title: "Notice Board",
      description: "Read important announcements",
      icon: Calendar,
      path: "/student/notices",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Student Panel
              </h1>
              <p className="text-foreground/70">
                Welcome back! Manage your learning journey here.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/student/settings">
                <Button
                  variant="outline"
                  className="border-primary/20 text-foreground hover:bg-primary/5"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button className="bg-destructive hover:bg-destructive/90 text-white">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg cursor-pointer group"
                >
                  <Link to={item.path}>
                    <CardContent className="pt-6">
                      <div className="inline-flex h-12 w-12 bg-primary/10 rounded-lg items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        {item.description}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>

          {/* Info Card */}
          <Card className="mt-12 border-primary/30 bg-gradient-to-r from-primary/5 to-green-600/5">
            <CardHeader>
              <CardTitle className="text-primary">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/70">
                Each section of the student panel is ready to be developed with
                full functionality. Click on any menu item above to explore the
                features.
              </p>
              <p className="text-sm text-foreground/60">
                If you have questions, contact us at info@biologycare.com or
                call +880 1234 567890
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
