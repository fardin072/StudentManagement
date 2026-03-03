import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Users,
  Clock,
  FileText,
  LogOut,
  Settings,
  BookOpen,
  Zap,
  TrendingUp,
  AlertCircle,
  Calendar,
  CheckCircle,
  File,
} from "lucide-react";

export default function AdminPanel() {
  const menuItems = [
    {
      id: 1,
      title: "Dashboard Overview",
      description: "View system statistics and analytics",
      icon: BarChart3,
      path: "/admin/dashboard",
    },
    {
      id: 2,
      title: "Admission Management",
      description: "Review and approve student admissions",
      icon: CheckCircle,
      path: "/admin/admissions",
    },
    {
      id: 3,
      title: "Student Management",
      description: "Manage student records and information",
      icon: Users,
      path: "/admin/students",
    },
    {
      id: 4,
      title: "Batch Management",
      description: "Create and manage course batches",
      icon: BookOpen,
      path: "/admin/batches",
    },
    {
      id: 5,
      title: "Attendance Management",
      description: "Record and track student attendance",
      icon: Clock,
      path: "/admin/attendance",
    },
    {
      id: 6,
      title: "Exam & Results",
      description: "Create exams and manage results",
      icon: FileText,
      path: "/admin/exams",
    },
    {
      id: 7,
      title: "MCQ Management",
      description: "Create and manage practice MCQs",
      icon: Zap,
      path: "/admin/mcq",
    },
    {
      id: 8,
      title: "Fee Management",
      description: "Track payments and fees",
      icon: TrendingUp,
      path: "/admin/fees",
    },
    {
      id: 9,
      title: "Notice & Announcements",
      description: "Post notices and announcements",
      icon: AlertCircle,
      path: "/admin/notices",
    },
    {
      id: 10,
      title: "Reports & Analytics",
      description: "Generate reports and view analytics",
      icon: BarChart3,
      path: "/admin/reports",
    },
    {
      id: 11,
      title: "Event Management",
      description: "Create and manage events, classes, and exams",
      icon: Calendar,
      path: "/admin/events",
    },
    {
      id: 12,
      title: "Study Materials",
      description: "Upload and manage study materials for batches",
      icon: File,
      path: "/admin/materials",
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
                Admin Panel
              </h1>
              <p className="text-foreground/70">
                Manage all aspects of Biology Care platform
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/admin/settings">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardTitle className="text-primary">System Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/70">
                The admin panel provides comprehensive management tools for all
                aspects of Biology Care. Each section can be developed with
                specific functionality as needed.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 border border-primary/20">
                  <p className="text-3xl font-bold text-primary">248</p>
                  <p className="text-sm text-foreground/60">Total Students</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-primary/20">
                  <p className="text-3xl font-bold text-primary">8</p>
                  <p className="text-sm text-foreground/60">Active Batches</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-primary/20">
                  <p className="text-3xl font-bold text-primary">95%</p>
                  <p className="text-sm text-foreground/60">Avg Attendance</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-primary/20">
                  <p className="text-3xl font-bold text-primary">₹ 4.2L</p>
                  <p className="text-sm text-foreground/60">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
