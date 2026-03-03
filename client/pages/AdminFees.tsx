import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, DollarSign, TrendingUp } from "lucide-react";

export default function AdminFees() {
  const feeStatistics = [
    {
      label: "Total Revenue (This Month)",
      value: "₹4,25,000",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Amount",
      value: "₹1,20,000",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Collected Payments",
      value: "₹12,75,000",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Collection Rate",
      value: "91.4%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const pendingPayments = [
    {
      id: 1,
      studentName: "Ahmed Hassan",
      batch: "HSC Biology",
      amount: "₹15,000",
      dueDate: "Mar 31, 2025",
      daysOverdue: 0,
    },
    {
      id: 2,
      studentName: "Fatima Khan",
      batch: "Medical Entrance",
      amount: "₹20,000",
      dueDate: "Mar 20, 2025",
      daysOverdue: 12,
    },
    {
      id: 3,
      studentName: "Ali Reza",
      batch: "HSC Biology",
      amount: "₹15,000",
      dueDate: "Mar 25, 2025",
      daysOverdue: 5,
    },
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
            Fee Management
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {feeStatistics.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="border-primary/20 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground/70 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
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

          {/* Payment Progress */}
          <Card className="mb-8 border-primary/20 bg-white">
            <CardHeader>
              <CardTitle>Monthly Collection Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-foreground">
                      Target: ₹5,00,000
                    </span>
                    <span className="text-sm text-primary font-bold">85%</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-4">
                    <div
                      className="bg-primary h-4 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Payments */}
          <Card className="border-orange-600/20 bg-white">
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-orange-200">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Batch
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Due Date
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">
                        Status
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-orange-100 hover:bg-orange-50"
                      >
                        <td className="py-3 px-4 text-foreground font-semibold">
                          {payment.studentName}
                        </td>
                        <td className="py-3 px-4 text-foreground/70">
                          {payment.batch}
                        </td>
                        <td className="py-3 px-4 font-bold text-primary">
                          {payment.amount}
                        </td>
                        <td className="py-3 px-4 text-foreground/70">
                          {payment.dueDate}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              payment.daysOverdue > 0
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {payment.daysOverdue > 0
                              ? `${payment.daysOverdue}d Overdue`
                              : "Due"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary/20 text-foreground"
                          >
                            Send Reminder
                          </Button>
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
