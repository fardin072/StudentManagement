import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle, Download } from "lucide-react";

export default function StudentFee() {
  const feeStatus = {
    totalFee: 45000,
    paid: 30000,
    pending: 15000,
    dueDate: "Mar 31, 2025",
  };

  const feeHistory = [
    {
      id: 1,
      month: "March 2025",
      amount: 15000,
      dueDate: "Mar 31, 2025",
      status: "pending",
      transactionId: "-",
    },
    {
      id: 2,
      month: "February 2025",
      amount: 15000,
      dueDate: "Feb 28, 2025",
      status: "paid",
      transactionId: "TXN20250228001",
      paidDate: "Feb 28, 2025",
    },
    {
      id: 3,
      month: "January 2025",
      amount: 15000,
      dueDate: "Jan 31, 2025",
      status: "paid",
      transactionId: "TXN20250128002",
      paidDate: "Jan 28, 2025",
    },
  ];

  const paymentMethods = [
    { name: "Online Banking", icon: "🏦" },
    { name: "Credit/Debit Card", icon: "💳" },
    { name: "UPI", icon: "📱" },
    { name: "Check/Draft", icon: "📄" },
  ];

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

          <h1 className="text-4xl font-bold text-foreground mb-8">Fee Status</h1>

          {/* Fee Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Total Fee</p>
                <p className="text-3xl font-bold text-foreground">₹{feeStatus.totalFee.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="border-green-600/20 bg-green-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Amount Paid</p>
                <p className="text-3xl font-bold text-green-600">₹{feeStatus.paid.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="border-orange-600/20 bg-orange-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Amount Due</p>
                <p className="text-3xl font-bold text-orange-600">₹{feeStatus.pending.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8 border-primary/20 bg-white">
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-foreground">Payment Progress</span>
                  <span className="font-bold text-primary">
                    {Math.round((feeStatus.paid / feeStatus.totalFee) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-primary/20 rounded-full h-4">
                  <div
                    className="bg-primary h-4 rounded-full"
                    style={{
                      width: `${(feeStatus.paid / feeStatus.totalFee) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-foreground/70">
                Due Date: <strong>{feeStatus.dueDate}</strong>
              </p>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Pay Fee Now</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentMethods.map((method, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="border-primary/20 text-foreground hover:bg-primary/5 h-24 flex-col"
                >
                  <span className="text-3xl mb-2">{method.icon}</span>
                  <span className="text-xs text-center">{method.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Fee History */}
          <Card className="border-primary/20 bg-white">
            <CardHeader>
              <CardTitle>Fee Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeHistory.map((record) => (
                  <div
                    key={record.id}
                    className="border border-primary/10 rounded-lg p-4 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{record.month}</h4>
                        <p className="text-sm text-foreground/60">
                          Due: {record.dueDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          ₹{record.amount.toLocaleString()}
                        </p>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1 ${
                            record.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {record.status === "paid" ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/70">
                        {record.status === "paid"
                          ? `Paid on: ${record.paidDate}`
                          : "Payment pending"}
                      </span>
                      {record.status === "paid" && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="mt-8 border-orange-600/20 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-900 mb-2">
                    Important Notice
                  </p>
                  <p className="text-sm text-orange-800">
                    Please pay the pending fee by <strong>{feeStatus.dueDate}</strong> to continue
                    your classes. Late payment may result in suspension of classes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
