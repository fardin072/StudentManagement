import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/Layout";
import {
  ArrowLeft,
  Users,
  Clock,
  DollarSign,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Search,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

// Mock batch data
const batchesData = [
  {
    id: 1,
    name: "HSC Biology (XI-XII)",
    instructor: "Prof. Dr. Rahman Ahmed",
    students: 45,
    fee: "₹15,000/month",
    schedule: "Sat & Wed, 5-7 PM",
    startDate: "Jan 10, 2025",
    status: "active",
    capacity: 50,
    duration: "2 years",
    totalEnrolled: 45,
    totalRevenue: "₹6,75,000",
    averageAttendance: 92,
    averagePerformance: 82,
  },
  {
    id: 2,
    name: "Medical Entrance Prep",
    instructor: "Prof. Dr. Rahman Ahmed",
    students: 38,
    fee: "₹20,000/month",
    schedule: "Daily, 6-8 PM",
    startDate: "Jan 15, 2025",
    status: "active",
    capacity: 40,
    duration: "1.5 years",
    totalEnrolled: 38,
    totalRevenue: "₹7,60,000",
    averageAttendance: 94,
    averagePerformance: 88,
  },
  {
    id: 3,
    name: "SSC Biology (IX-X)",
    instructor: "Prof. Dr. Rahman Ahmed",
    students: 42,
    fee: "₹10,000/month",
    schedule: "Tue & Fri, 5-7 PM",
    startDate: "Jan 20, 2025",
    status: "active",
    capacity: 50,
    duration: "2 years",
    totalEnrolled: 42,
    totalRevenue: "₹4,20,000",
    averageAttendance: 88,
    averagePerformance: 79,
  },
  {
    id: 4,
    name: "Competitive Exam Coaching",
    instructor: "Prof. Dr. Rahman Ahmed",
    students: 28,
    fee: "₹8,000/month",
    schedule: "Sat & Sun, 10-12 AM",
    startDate: "Feb 01, 2025",
    status: "active",
    capacity: 35,
    duration: "1 year",
    totalEnrolled: 28,
    totalRevenue: "₹2,24,000",
    averageAttendance: 85,
    averagePerformance: 75,
  },
];

// Mock students data for each batch
const batchStudentsData: Record<
  number,
  {
    id: number;
    name: string;
    enrollmentId: string;
    email: string;
    phone: string;
    joinDate: string;
    attendance: number;
    averageScore: number;
    paymentStatus: "paid" | "pending" | "overdue";
  }[]
> = {
  1: [
    {
      id: 1,
      name: "Ahmed Hassan",
      enrollmentId: "BC2024001",
      email: "ahmed.hassan@example.com",
      phone: "+880 1234 567890",
      joinDate: "Jan 10, 2025",
      attendance: 94,
      averageScore: 87,
      paymentStatus: "paid",
    },
    {
      id: 2,
      name: "Fatima Khan",
      enrollmentId: "BC2024002",
      email: "fatima.khan@example.com",
      phone: "+880 9876 543210",
      joinDate: "Jan 15, 2025",
      attendance: 96,
      averageScore: 92,
      paymentStatus: "paid",
    },
    {
      id: 3,
      name: "Ali Reza",
      enrollmentId: "BC2024003",
      email: "ali.reza@example.com",
      phone: "+880 5555 666777",
      joinDate: "Jan 20, 2025",
      attendance: 89,
      averageScore: 85,
      paymentStatus: "pending",
    },
    {
      id: 4,
      name: "Zahra Amin",
      enrollmentId: "BC2024004",
      email: "zahra.amin@example.com",
      phone: "+880 4444 333222",
      joinDate: "Jan 25, 2025",
      attendance: 91,
      averageScore: 88,
      paymentStatus: "paid",
    },
    {
      id: 5,
      name: "Karim Abdullah",
      enrollmentId: "BC2024005",
      email: "karim.abdullah@example.com",
      phone: "+880 3333 222111",
      joinDate: "Feb 01, 2025",
      attendance: 76,
      averageScore: 72,
      paymentStatus: "overdue",
    },
  ],
  2: [
    {
      id: 6,
      name: "Mehdi Hassan",
      enrollmentId: "ME2024001",
      email: "mehdi.hassan@example.com",
      phone: "+880 7777 888999",
      joinDate: "Jan 15, 2025",
      attendance: 97,
      averageScore: 91,
      paymentStatus: "paid",
    },
    {
      id: 7,
      name: "Nuzhat Alam",
      enrollmentId: "ME2024002",
      email: "nuzhat.alam@example.com",
      phone: "+880 6666 555444",
      joinDate: "Jan 20, 2025",
      attendance: 94,
      averageScore: 89,
      paymentStatus: "paid",
    },
  ],
  3: [
    {
      id: 8,
      name: "Rahim Khan",
      enrollmentId: "SC2024001",
      email: "rahim.khan@example.com",
      phone: "+880 9999 000111",
      joinDate: "Jan 20, 2025",
      attendance: 88,
      averageScore: 80,
      paymentStatus: "paid",
    },
    {
      id: 9,
      name: "Sara Ahmed",
      enrollmentId: "SC2024002",
      email: "sara.ahmed@example.com",
      phone: "+880 8888 777666",
      joinDate: "Jan 25, 2025",
      attendance: 85,
      averageScore: 75,
      paymentStatus: "pending",
    },
  ],
  4: [
    {
      id: 10,
      name: "Hasan Khan",
      enrollmentId: "CE2024001",
      email: "hasan.khan@example.com",
      phone: "+880 1111 222333",
      joinDate: "Feb 01, 2025",
      attendance: 86,
      averageScore: 76,
      paymentStatus: "paid",
    },
    {
      id: 11,
      name: "Aisha Rahman",
      enrollmentId: "CE2024002",
      email: "aisha.rahman@example.com",
      phone: "+880 2222 333444",
      joinDate: "Feb 05, 2025",
      attendance: 80,
      averageScore: 70,
      paymentStatus: "pending",
    },
  ],
};

// Mock attendance data for each batch
const batchAttendanceData: Record<
  number,
  { date: string; presentCount: number; absentCount: number }[]
> = {
  1: [
    { date: "Jan 10, 2025", presentCount: 43, absentCount: 2 },
    { date: "Jan 11, 2025", presentCount: 44, absentCount: 1 },
    { date: "Jan 12, 2025", presentCount: 42, absentCount: 3 },
    { date: "Jan 13, 2025", presentCount: 45, absentCount: 0 },
    { date: "Jan 14, 2025", presentCount: 41, absentCount: 4 },
  ],
  2: [
    { date: "Jan 15, 2025", presentCount: 37, absentCount: 1 },
    { date: "Jan 16, 2025", presentCount: 38, absentCount: 0 },
    { date: "Jan 17, 2025", presentCount: 36, absentCount: 2 },
  ],
  3: [
    { date: "Jan 20, 2025", presentCount: 40, absentCount: 2 },
    { date: "Jan 21, 2025", presentCount: 41, absentCount: 1 },
    { date: "Jan 22, 2025", presentCount: 39, absentCount: 3 },
  ],
  4: [
    { date: "Feb 01, 2025", presentCount: 27, absentCount: 1 },
    { date: "Feb 02, 2025", presentCount: 28, absentCount: 0 },
  ],
};

// Mock exam marks data for each batch
const examMarksData: Record<
  number,
  {
    id: number;
    examName: string;
    marks: Record<number, number>; // student id -> marks
  }[]
> = {
  1: [
    {
      id: 1,
      examName: "Biology Midterm",
      marks: {
        1: 45,
        2: 48,
        3: 42,
        4: 46,
        5: 35,
      },
    },
    {
      id: 2,
      examName: "Chemistry Quiz",
      marks: {
        1: 25,
        2: 27,
        3: 23,
        4: 24,
        5: 20,
      },
    },
  ],
  2: [
    {
      id: 1,
      examName: "Medical Science Exam 1",
      marks: {
        6: 42,
        7: 40,
      },
    },
  ],
  3: [
    {
      id: 1,
      examName: "General Science Quiz",
      marks: {
        8: 32,
        9: 28,
      },
    },
  ],
  4: [
    {
      id: 1,
      examName: "Competitive Exam 1",
      marks: {
        10: 35,
        11: 32,
      },
    },
  ],
};

// Mock payment data for each batch
const batchPaymentData: Record<
  number,
  {
    month: string;
    expectedAmount: string;
    collectedAmount: string;
    paidStudents: number;
    pendingStudents: number;
    overdueStudents: number;
  }[]
> = {
  1: [
    {
      month: "January",
      expectedAmount: "₹6,75,000",
      collectedAmount: "₹6,30,000",
      paidStudents: 42,
      pendingStudents: 2,
      overdueStudents: 1,
    },
    {
      month: "February",
      expectedAmount: "₹6,75,000",
      collectedAmount: "₹4,50,000",
      paidStudents: 30,
      pendingStudents: 15,
      overdueStudents: 0,
    },
  ],
  2: [
    {
      month: "January",
      expectedAmount: "₹7,60,000",
      collectedAmount: "₹7,60,000",
      paidStudents: 38,
      pendingStudents: 0,
      overdueStudents: 0,
    },
  ],
  3: [
    {
      month: "January",
      expectedAmount: "₹4,20,000",
      collectedAmount: "₹3,90,000",
      paidStudents: 39,
      pendingStudents: 3,
      overdueStudents: 0,
    },
  ],
  4: [
    {
      month: "February",
      expectedAmount: "₹2,24,000",
      collectedAmount: "₹2,24,000",
      paidStudents: 28,
      pendingStudents: 0,
      overdueStudents: 0,
    },
  ],
};

export default function AdminBatchDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchStudent, setSearchStudent] = useState("");
  const [smsType, setSmsType] = useState<"absent" | "marks">("absent");
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [smsMessage, setSmsMessage] = useState("");
  const [selectedStudentsForSms, setSelectedStudentsForSms] = useState<
    number[]
  >([]);
  const [selectedAttendanceDay, setSelectedAttendanceDay] = useState<number | null>(
    null
  );
  const [smsSent, setSmsSent] = useState(false);

  const batchId = parseInt(id || "0", 10);
  const batch = batchesData.find((b) => b.id === batchId);

  if (!batch) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-foreground/70">Batch not found</p>
              <Button onClick={() => navigate("/admin/batches")} className="mt-4">
                Back to Batches
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const batchStudents = batchStudentsData[batchId] || [];
  const batchAttendance = batchAttendanceData[batchId] || [];
  const batchPayments = batchPaymentData[batchId] || [];

  const filteredStudents = batchStudents.filter((student) =>
    student.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
    student.enrollmentId.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const totalAttendancePercentage =
    batchStudents.length > 0
      ? Math.round(
          batchStudents.reduce((sum, s) => sum + s.attendance, 0) /
            batchStudents.length
        )
      : 0;

  const totalPerformancePercentage =
    batchStudents.length > 0
      ? Math.round(
          batchStudents.reduce((sum, s) => sum + s.averageScore, 0) /
            batchStudents.length
        )
      : 0;

  const paidStudentsCount = batchStudents.filter(
    (s) => s.paymentStatus === "paid"
  ).length;
  const pendingPaymentsCount = batchStudents.filter(
    (s) => s.paymentStatus === "pending"
  ).length;
  const overduePaymentsCount = batchStudents.filter(
    (s) => s.paymentStatus === "overdue"
  ).length;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/batches")}
            className="mb-8 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Batches
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {batch.name}
            </h1>
            <p className="text-foreground/70">{batch.instructor}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-xs text-foreground/60">Students</p>
                    <p className="text-2xl font-bold text-foreground">
                      {batch.students}/{batch.capacity}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-xs text-foreground/60">Schedule</p>
                    <p className="text-sm font-bold text-foreground">
                      {batch.schedule}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-xs text-foreground/60">Monthly Fee</p>
                    <p className="text-lg font-bold text-foreground">
                      {batch.fee}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-xs text-foreground/60">Started</p>
                    <p className="text-sm font-bold text-foreground">
                      {batch.startDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-5 border border-primary/20">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
            </TabsList>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Enrolled Students</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
                      <Input
                        placeholder="Search by name or ID..."
                        value={searchStudent}
                        onChange={(e) => setSearchStudent(e.target.value)}
                        className="pl-10 border-primary/20"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Enrollment ID
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Attendance
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Score
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Payment
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student) => (
                          <tr
                            key={student.id}
                            className="border-b border-primary/10 hover:bg-primary/5"
                          >
                            <td className="py-3 px-4 font-semibold text-foreground">
                              {student.name}
                            </td>
                            <td className="py-3 px-4 text-foreground/70">
                              {student.enrollmentId}
                            </td>
                            <td className="py-3 px-4 text-foreground/70">
                              {student.email}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-primary/10 rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{
                                      width: `${student.attendance}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-xs font-semibold text-foreground">
                                  {student.attendance}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm font-semibold text-foreground">
                                {student.averageScore}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                  student.paymentStatus === "paid"
                                    ? "bg-green-100 text-green-700"
                                    : student.paymentStatus === "pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {student.paymentStatus.charAt(0).toUpperCase() +
                                  student.paymentStatus.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredStudents.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-foreground/70">No students found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border-primary/20 bg-white">
                  <CardContent className="pt-6">
                    <p className="text-xs text-foreground/60 mb-2">
                      Avg Attendance Rate
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {totalAttendancePercentage}%
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-green-600/20 bg-green-50">
                  <CardContent className="pt-6">
                    <p className="text-xs text-foreground/60 mb-2">
                      Avg Present (Today)
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {batchAttendance.length > 0
                        ? Math.round(
                            batchAttendance[batchAttendance.length - 1]
                              .presentCount
                          )
                        : 0}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-red-600/20 bg-red-50">
                  <CardContent className="pt-6">
                    <p className="text-xs text-foreground/60 mb-2">
                      Avg Absent (Today)
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {batchAttendance.length > 0
                        ? batchAttendance[batchAttendance.length - 1].absentCount
                        : 0}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Present
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Absent
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Percentage
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {batchAttendance.map((record, idx) => {
                          const total =
                            record.presentCount + record.absentCount;
                          const percentage = Math.round(
                            (record.presentCount / total) * 100
                          );
                          return (
                            <tr
                              key={idx}
                              className="border-b border-primary/10 hover:bg-primary/5 cursor-pointer"
                              onClick={() => setSelectedAttendanceDay(idx)}
                            >
                              <td className="py-3 px-4 font-semibold text-foreground">
                                {record.date}
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-green-700 font-semibold">
                                  {record.presentCount}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-red-700 font-semibold">
                                  {record.absentCount}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-primary/10 rounded-full h-2">
                                    <div
                                      className="bg-green-500 h-2 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-semibold">
                                    {percentage}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {batchAttendance.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-foreground/70">
                        No attendance records
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="border-primary/20 bg-white">
                  <CardContent className="pt-6">
                    <p className="text-xs text-foreground/60 mb-2">
                      Batch Avg Score
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {totalPerformancePercentage}%
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-white">
                  <CardContent className="pt-6">
                    <p className="text-xs text-foreground/60 mb-2">
                      Total Students
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {batchStudents.length}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Student Name
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Enrollment ID
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Attendance
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Average Score
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Grade
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {batchStudents.map((student) => {
                          let grade = "A";
                          if (student.averageScore < 50) grade = "F";
                          else if (student.averageScore < 60) grade = "D";
                          else if (student.averageScore < 70) grade = "C";
                          else if (student.averageScore < 80) grade = "B";

                          return (
                            <tr
                              key={student.id}
                              className="border-b border-primary/10 hover:bg-primary/5"
                            >
                              <td className="py-3 px-4 font-semibold text-foreground">
                                {student.name}
                              </td>
                              <td className="py-3 px-4 text-foreground/70">
                                {student.enrollmentId}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-primary/10 rounded-full h-2">
                                    <div
                                      className="bg-primary h-2 rounded-full"
                                      style={{
                                        width: `${student.attendance}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-semibold">
                                    {student.attendance}%
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 bg-primary/10 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${
                                        student.averageScore >= 80
                                          ? "bg-green-500"
                                          : student.averageScore >= 60
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                      style={{
                                        width: `${student.averageScore}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-semibold">
                                    {student.averageScore}%
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`text-sm font-bold px-2 py-1 rounded ${
                                    grade === "A"
                                      ? "bg-green-100 text-green-700"
                                      : grade === "B"
                                        ? "bg-blue-100 text-blue-700"
                                        : grade === "C"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : grade === "D"
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {grade}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border-green-600/20 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-xs text-foreground/60">Paid</p>
                        <p className="text-2xl font-bold text-green-600">
                          {paidStudentsCount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-yellow-600/20 bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-yellow-600" />
                      <div>
                        <p className="text-xs text-foreground/60">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          {pendingPaymentsCount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-red-600/20 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                      <div>
                        <p className="text-xs text-foreground/60">Overdue</p>
                        <p className="text-2xl font-bold text-red-600">
                          {overduePaymentsCount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Student Payment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary/20">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Student Name
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Email
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Phone
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {batchStudents.map((student) => (
                          <tr
                            key={student.id}
                            className="border-b border-primary/10 hover:bg-primary/5"
                          >
                            <td className="py-3 px-4 font-semibold text-foreground">
                              {student.name}
                            </td>
                            <td className="py-3 px-4 text-foreground/70">
                              {student.email}
                            </td>
                            <td className="py-3 px-4 text-foreground/70">
                              {student.phone}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                  student.paymentStatus === "paid"
                                    ? "bg-green-100 text-green-700"
                                    : student.paymentStatus === "pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {student.paymentStatus.charAt(0).toUpperCase() +
                                  student.paymentStatus.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Monthly Collection Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {batchPayments.map((payment, idx) => (
                      <div
                        key={idx}
                        className="border border-primary/20 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-foreground">
                            {payment.month}
                          </h4>
                          <div className="text-right">
                            <p className="text-xs text-foreground/60 mb-1">
                              Collected
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {payment.collectedAmount}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-green-50 p-3 rounded">
                            <p className="text-xs text-foreground/60 mb-1">
                              Paid
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              {payment.paidStudents}
                            </p>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded">
                            <p className="text-xs text-foreground/60 mb-1">
                              Pending
                            </p>
                            <p className="text-lg font-bold text-yellow-600">
                              {payment.pendingStudents}
                            </p>
                          </div>
                          <div className="bg-red-50 p-3 rounded">
                            <p className="text-xs text-foreground/60 mb-1">
                              Overdue
                            </p>
                            <p className="text-lg font-bold text-red-600">
                              {payment.overdueStudents}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SMS Tab */}
            <TabsContent value="sms" className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Send SMS Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {smsSent && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <p className="text-green-700 font-semibold">
                        SMS sent successfully to {selectedStudentsForSms.length}{" "}
                        student(s)!
                      </p>
                    </div>
                  )}

                  {/* SMS Type Selection */}
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">Select SMS Type:</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer p-3 border border-primary/20 rounded-lg hover:bg-primary/5">
                        <input
                          type="radio"
                          name="smsType"
                          value="absent"
                          checked={smsType === "absent"}
                          onChange={(e) => {
                            setSmsType(e.target.value as "absent" | "marks");
                            setSelectedExam(null);
                            setSmsMessage("");
                            setSelectedStudentsForSms([]);
                          }}
                          className="cursor-pointer"
                        />
                        <span className="font-semibold text-foreground">
                          Send Absent Notifications
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-3 border border-primary/20 rounded-lg hover:bg-primary/5">
                        <input
                          type="radio"
                          name="smsType"
                          value="marks"
                          checked={smsType === "marks"}
                          onChange={(e) => {
                            setSmsType(e.target.value as "absent" | "marks");
                            setSelectedExam(null);
                            setSmsMessage("");
                            setSelectedStudentsForSms([]);
                          }}
                          className="cursor-pointer"
                        />
                        <span className="font-semibold text-foreground">
                          Send Exam Marks
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Exam Selection for Marks */}
                  {smsType === "marks" && (
                    <div className="space-y-3">
                      <p className="font-semibold text-foreground">
                        Select Exam:
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {(examMarksData[batchId] || []).map((exam) => (
                          <label
                            key={exam.id}
                            className="flex items-center gap-3 cursor-pointer p-3 border border-primary/20 rounded-lg hover:bg-primary/5"
                          >
                            <input
                              type="radio"
                              name="exam"
                              value={exam.id}
                              checked={selectedExam === exam.id}
                              onChange={() => setSelectedExam(exam.id)}
                              className="cursor-pointer"
                            />
                            <span className="text-foreground">{exam.examName}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Template Preview */}
                  {smsType === "absent" && (
                    <div className="space-y-3">
                      <p className="font-semibold text-foreground">
                        Message Template:
                      </p>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <p className="text-sm text-foreground">
                          Hi [Student Name], You were marked absent on{" "}
                          <span className="font-semibold">
                            [Date]
                          </span>{" "}
                          in <span className="font-semibold">{batch.name}</span>.
                          Please catch up on the material and contact your
                          instructor if you have any questions.
                        </p>
                      </div>
                    </div>
                  )}

                  {smsType === "marks" && selectedExam && (
                    <div className="space-y-3">
                      <p className="font-semibold text-foreground">
                        Message Template:
                      </p>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <p className="text-sm text-foreground">
                          Hi [Student Name], Your marks for{" "}
                          <span className="font-semibold">
                            {
                              examMarksData[batchId]?.find((e) => e.id === selectedExam)
                                ?.examName
                            }
                          </span>{" "}
                          is <span className="font-semibold">[Score]</span>. Keep
                          working hard!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Student Selection */}
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">
                      Select Students:
                    </p>
                    <div className="max-h-64 overflow-y-auto space-y-2 border border-primary/20 rounded-lg p-4">
                      {batchStudents.map((student) => {
                        const shouldShow =
                          smsType === "absent" ||
                          (smsType === "marks" &&
                            selectedExam &&
                            examMarksData[batchId]
                              ?.find((e) => e.id === selectedExam)
                              ?.marks[student.id] !== undefined);

                        if (!shouldShow) return null;

                        return (
                          <label
                            key={student.id}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <Checkbox
                              checked={selectedStudentsForSms.includes(student.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedStudentsForSms([
                                    ...selectedStudentsForSms,
                                    student.id,
                                  ]);
                                } else {
                                  setSelectedStudentsForSms(
                                    selectedStudentsForSms.filter(
                                      (id) => id !== student.id
                                    )
                                  );
                                }
                              }}
                            />
                            <span className="text-foreground">
                              {student.name} ({student.enrollmentId})
                              {smsType === "marks" && selectedExam && (
                                <span className="ml-2 font-semibold text-primary">
                                  -{" "}
                                  {
                                    examMarksData[batchId]
                                      ?.find((e) => e.id === selectedExam)
                                      ?.marks[student.id]
                                  }{" "}
                                  marks
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Message */}
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">
                      Custom Message (Optional):
                    </p>
                    <Textarea
                      placeholder="Add any additional message..."
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      className="border-primary/20 min-h-24"
                    />
                  </div>

                  {/* Send Button */}
                  <div className="flex gap-3 pt-4 border-t border-primary/20">
                    <Button
                      onClick={() => {
                        setSmsSent(true);
                        setTimeout(() => {
                          setSmsSent(false);
                          setSelectedStudentsForSms([]);
                          setSmsMessage("");
                          setSelectedExam(null);
                        }, 3000);
                      }}
                      disabled={selectedStudentsForSms.length === 0}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send SMS to {selectedStudentsForSms.length} Student(s)
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedStudentsForSms([]);
                        setSmsMessage("");
                        setSelectedExam(null);
                      }}
                      variant="outline"
                      className="border-primary/20 text-foreground"
                    >
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Attendance Day Detail Modal */}
      {selectedAttendanceDay !== null && batchAttendance[selectedAttendanceDay] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="border-primary/20 bg-white max-w-2xl w-full max-h-96 overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    Attendance for {batchAttendance[selectedAttendanceDay].date}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAttendanceDay(null)}
                  className="text-foreground/70 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-xs text-foreground/60 mb-1">Present</p>
                  <p className="text-2xl font-bold text-green-600">
                    {batchAttendance[selectedAttendanceDay].presentCount}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-xs text-foreground/60 mb-1">Absent</p>
                  <p className="text-2xl font-bold text-red-600">
                    {batchAttendance[selectedAttendanceDay].absentCount}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-xs text-foreground/60 mb-1">Total</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {batchAttendance[selectedAttendanceDay].presentCount +
                      batchAttendance[selectedAttendanceDay].absentCount}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Student-wise Attendance
                </h4>
                <div className="space-y-2">
                  {batchStudents.map((student) => {
                    const isPresent =
                      Math.random() > 0.15 * (1 - student.attendance / 100);
                    return (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 border border-primary/20 rounded-lg"
                      >
                        <span className="text-foreground">{student.name}</span>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            isPresent
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {isPresent ? "Present" : "Absent"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Layout>
  );
}
