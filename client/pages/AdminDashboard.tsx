import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, BookOpen, TrendingUp, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { AdmissionRequest } from "@shared/api";

export default function AdminDashboard() {
  const [pendingAdmissions, setPendingAdmissions] = useState<AdmissionRequest[]>([]);
  const [admissionsLoading, setAdmissionsLoading] = useState(false);

  useEffect(() => {
    fetchPendingAdmissions();
  }, []);

  const fetchPendingAdmissions = async () => {
    try {
      setAdmissionsLoading(true);
      const response = await fetch("/api/admissions?status=pending");
      if (response.ok) {
        const data = await response.json();
        setPendingAdmissions(data.admissions || []);
      }
    } catch (err) {
      console.error("Failed to fetch pending admissions:", err);
    } finally {
      setAdmissionsLoading(false);
    }
  };

  const stats = [
    {
      label: "Total Students",
      value: "248",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Pending Admissions",
      value: pendingAdmissions.length.toString(),
      icon: CheckCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Active Batches",
      value: "8",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Monthly Revenue",
      value: "₹4.2L",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      activity: "New student registered",
      details: "Fatima Khan enrolled in HSC Biology",
      time: "2 hours ago",
    },
    {
      id: 2,
      activity: "Exam created",
      details: "Human Physiology Quiz scheduled",
      time: "5 hours ago",
    },
    {
      id: 3,
      activity: "Batch updated",
      details: "Class schedule changed for Medical Prep",
      time: "1 day ago",
    },
    {
      id: 4,
      activity: "Fee payment received",
      details: "₹15,000 from Ahmed Hassan",
      time: "1 day ago",
    },
  ];

  const topBatches = [
    { name: "HSC Biology", students: 45, revenue: "₹67,500" },
    { name: "Medical Entrance Prep", students: 38, revenue: "₹57,000" },
    { name: "SSC Biology", students: 42, revenue: "₹42,000" },
    { name: "Competitive Exams", students: 28, revenue: "₹22,400" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/admin/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard Overview</h1>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="border-primary/20 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground/70 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pending Admissions Alert */}
          {pendingAdmissions.length > 0 && (
            <Card className="mb-8 border-yellow-300 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {pendingAdmissions.length} Pending Admission Request{pendingAdmissions.length !== 1 ? 's' : ''}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        Review and approve new student admissions
                      </p>
                    </div>
                  </div>
                  <Link to="/admin/admissions">
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      Review Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between pb-4 border-b border-primary/10 last:border-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {item.activity}
                        </h4>
                        <p className="text-sm text-foreground/70">
                          {item.details}
                        </p>
                      </div>
                      <span className="text-xs text-foreground/60 whitespace-nowrap ml-4">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <div>
              <Card className="border-primary/20 bg-white h-full">
                <CardHeader>
                  <CardTitle className="text-lg">System Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">
                        Server Status
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Healthy
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">
                        Database
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Connected
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">
                        Active Sessions
                      </span>
                      <span className="text-sm font-bold text-primary">24</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pending Admissions List */}
          {pendingAdmissions.length > 0 && (
            <Card className="mt-8 border-primary/20 bg-white">
              <CardHeader>
                <CardTitle>Recent Admission Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingAdmissions.slice(0, 5).map((admission) => (
                    <div
                      key={admission.id}
                      className="flex items-start justify-between pb-4 border-b border-primary/10 last:border-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {admission.firstName} {admission.lastName}
                        </h4>
                        <p className="text-sm text-foreground/70">
                          {admission.email} • {admission.phone}
                        </p>
                        <p className="text-xs text-foreground/60 mt-1">
                          Program: <span className="font-medium">{admission.program}</span> • Applied: {new Date(admission.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold whitespace-nowrap ml-4">
                        Pending
                      </span>
                    </div>
                  ))}
                </div>
                {pendingAdmissions.length > 5 && (
                  <Link to="/admin/admissions" className="inline-block mt-4">
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                      View All {pendingAdmissions.length} Requests
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Top Batches */}
          <Card className="mt-8 border-primary/20 bg-white">
            <CardHeader>
              <CardTitle>Top Performing Batches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Batch Name
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">
                        Students
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topBatches.map((batch, idx) => (
                      <tr key={idx} className="border-b border-primary/10 hover:bg-primary/5">
                        <td className="py-3 px-4 text-foreground">{batch.name}</td>
                        <td className="py-3 px-4 text-right text-foreground font-semibold">
                          {batch.students}
                        </td>
                        <td className="py-3 px-4 text-right text-primary font-bold">
                          {batch.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
