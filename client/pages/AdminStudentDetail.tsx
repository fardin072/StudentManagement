import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";

// Mock data for the same students
const studentsData = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+880 1234 567890",
    enrollmentId: "BC2024001",
    batch: "HSC Biology",
    program: "Advanced",
    joinDate: "Jan 10, 2025",
    dateOfBirth: "May 15, 2007",
    address: "123 Main Street, Dhaka",
    fatherName: "Hassan Ali",
    status: "active",
    attendance: 94,
    averageScore: 87,
  },
  {
    id: 2,
    name: "Fatima Khan",
    email: "fatima.khan@example.com",
    phone: "+880 9876 543210",
    enrollmentId: "BC2024002",
    batch: "HSC Biology",
    program: "Advanced",
    joinDate: "Jan 15, 2025",
    dateOfBirth: "Aug 20, 2007",
    address: "456 Oak Avenue, Dhaka",
    fatherName: "Khan Rahman",
    status: "active",
    attendance: 96,
    averageScore: 92,
  },
  {
    id: 3,
    name: "Ali Reza",
    email: "ali.reza@example.com",
    phone: "+880 5555 666777",
    enrollmentId: "ME2024003",
    batch: "Medical Entrance",
    program: "Professional",
    joinDate: "Feb 01, 2025",
    dateOfBirth: "March 10, 2006",
    address: "789 Pine Road, Dhaka",
    fatherName: "Reza Khan",
    status: "active",
    attendance: 92,
    averageScore: 85,
  },
  {
    id: 4,
    name: "Zahra Amin",
    email: "zahra.amin@example.com",
    phone: "+880 4444 333222",
    enrollmentId: "SC2024004",
    batch: "SSC Biology",
    program: "Standard",
    joinDate: "Feb 10, 2025",
    dateOfBirth: "July 5, 2008",
    address: "321 Elm Street, Dhaka",
    fatherName: "Amin Ahmed",
    status: "active",
    attendance: 89,
    averageScore: 78,
  },
  {
    id: 5,
    name: "Karim Abdullah",
    email: "karim.abdullah@example.com",
    phone: "+880 3333 222111",
    enrollmentId: "BC2024005",
    batch: "HSC Biology",
    program: "Advanced",
    joinDate: "Feb 20, 2025",
    dateOfBirth: "Jan 25, 2007",
    address: "654 Maple Lane, Dhaka",
    fatherName: "Abdullah Khan",
    status: "inactive",
    attendance: 65,
    averageScore: 72,
  },
];

// Mock data for enrolled courses
const coursesData: Record<number, any[]> = {
  1: [
    {
      id: 1,
      name: "Biology - Botany",
      instructor: "Dr. Hasan Ahmed",
      progress: 85,
      status: "ongoing",
    },
    {
      id: 2,
      name: "Biology - Zoology",
      instructor: "Dr. Fatima Khan",
      progress: 92,
      status: "ongoing",
    },
    {
      id: 3,
      name: "Chemistry - Organic",
      instructor: "Dr. Karim Khan",
      progress: 78,
      status: "ongoing",
    },
  ],
  2: [
    {
      id: 1,
      name: "Biology - Botany",
      instructor: "Dr. Hasan Ahmed",
      progress: 95,
      status: "ongoing",
    },
    {
      id: 2,
      name: "Biology - Zoology",
      instructor: "Dr. Fatima Khan",
      progress: 98,
      status: "ongoing",
    },
  ],
  3: [
    {
      id: 1,
      name: "Medical Science - Anatomy",
      instructor: "Dr. Ali Khan",
      progress: 88,
      status: "ongoing",
    },
    {
      id: 2,
      name: "Medical Science - Physiology",
      instructor: "Dr. Rahman Ahmed",
      progress: 85,
      status: "ongoing",
    },
  ],
  4: [
    {
      id: 1,
      name: "Basic Biology",
      instructor: "Dr. Hasan Ahmed",
      progress: 75,
      status: "ongoing",
    },
    {
      id: 2,
      name: "General Science",
      instructor: "Dr. Khan Rahman",
      progress: 82,
      status: "ongoing",
    },
  ],
  5: [
    {
      id: 1,
      name: "Biology - Botany",
      instructor: "Dr. Hasan Ahmed",
      progress: 50,
      status: "ongoing",
    },
  ],
};

// Mock data for exams with MCQs
const examsData: Record<number, any[]> = {
  1: [
    {
      id: 1,
      name: "Biology Midterm 1",
      date: "Jan 25, 2025",
      totalMarks: 50,
      obtainedMarks: 45,
      status: "completed",
      mcqs: [
        {
          id: 1,
          question: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
          correctAnswer: "Mitochondria",
          studentAnswer: "Mitochondria",
          isCorrect: true,
        },
        {
          id: 2,
          question: "Photosynthesis occurs in which organelle?",
          options: ["Mitochondria", "Nucleus", "Chloroplast", "Golgi"],
          correctAnswer: "Chloroplast",
          studentAnswer: "Mitochondria",
          isCorrect: false,
        },
        {
          id: 3,
          question: "Which enzyme breaks down proteins?",
          options: ["Amylase", "Protease", "Lipase", "Phosphatase"],
          correctAnswer: "Protease",
          studentAnswer: "Protease",
          isCorrect: true,
        },
      ],
    },
    {
      id: 2,
      name: "Chemistry Quiz",
      date: "Feb 01, 2025",
      totalMarks: 30,
      obtainedMarks: 25,
      status: "completed",
      mcqs: [
        {
          id: 1,
          question: "What is the atomic number of Oxygen?",
          options: ["6", "7", "8", "9"],
          correctAnswer: "8",
          studentAnswer: "8",
          isCorrect: true,
        },
        {
          id: 2,
          question: "Which element is in group 17?",
          options: ["Oxygen", "Nitrogen", "Chlorine", "Sulfur"],
          correctAnswer: "Chlorine",
          studentAnswer: "Chlorine",
          isCorrect: true,
        },
        {
          id: 3,
          question: "What is the pH of neutral solution?",
          options: ["6", "7", "8", "9"],
          correctAnswer: "7",
          studentAnswer: "8",
          isCorrect: false,
        },
      ],
    },
  ],
  2: [
    {
      id: 1,
      name: "Biology Midterm 1",
      date: "Jan 25, 2025",
      totalMarks: 50,
      obtainedMarks: 48,
      status: "completed",
      mcqs: [
        {
          id: 1,
          question: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
          correctAnswer: "Mitochondria",
          studentAnswer: "Mitochondria",
          isCorrect: true,
        },
        {
          id: 2,
          question: "Photosynthesis occurs in which organelle?",
          options: ["Mitochondria", "Nucleus", "Chloroplast", "Golgi"],
          correctAnswer: "Chloroplast",
          studentAnswer: "Chloroplast",
          isCorrect: true,
        },
      ],
    },
  ],
  3: [
    {
      id: 1,
      name: "Medical Science Exam 1",
      date: "Feb 05, 2025",
      totalMarks: 50,
      obtainedMarks: 42,
      status: "completed",
      mcqs: [
        {
          id: 1,
          question: "Number of bones in human body?",
          options: ["186", "206", "216", "196"],
          correctAnswer: "206",
          studentAnswer: "206",
          isCorrect: true,
        },
      ],
    },
  ],
  4: [
    {
      id: 1,
      name: "General Science Quiz",
      date: "Jan 30, 2025",
      totalMarks: 40,
      obtainedMarks: 32,
      status: "completed",
      mcqs: [
        {
          id: 1,
          question: "What is the SI unit of force?",
          options: ["Dyne", "Newton", "Erg", "Joule"],
          correctAnswer: "Newton",
          studentAnswer: "Newton",
          isCorrect: true,
        },
      ],
    },
  ],
  5: [
    {
      id: 1,
      name: "Biology Midterm 1",
      date: "Jan 25, 2025",
      totalMarks: 50,
      obtainedMarks: 35,
      status: "completed",
      mcqs: [
        {
          id: 1,
          question: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
          correctAnswer: "Mitochondria",
          studentAnswer: "Nucleus",
          isCorrect: false,
        },
      ],
    },
  ],
};

// Mock data for attendance
const attendanceData: Record<number, any[]> = {
  1: [
    { date: "Jan 10, 2025", status: "present" },
    { date: "Jan 11, 2025", status: "present" },
    { date: "Jan 12, 2025", status: "absent" },
    { date: "Jan 13, 2025", status: "present" },
    { date: "Jan 14, 2025", status: "present" },
    { date: "Jan 15, 2025", status: "present" },
    { date: "Jan 16, 2025", status: "present" },
    { date: "Jan 17, 2025", status: "present" },
    { date: "Jan 18, 2025", status: "absent" },
    { date: "Jan 19, 2025", status: "present" },
  ],
  2: [
    { date: "Jan 10, 2025", status: "present" },
    { date: "Jan 11, 2025", status: "present" },
    { date: "Jan 12, 2025", status: "present" },
    { date: "Jan 13, 2025", status: "present" },
    { date: "Jan 14, 2025", status: "present" },
    { date: "Jan 15, 2025", status: "present" },
  ],
  3: [
    { date: "Feb 01, 2025", status: "present" },
    { date: "Feb 02, 2025", status: "present" },
    { date: "Feb 03, 2025", status: "absent" },
    { date: "Feb 04, 2025", status: "present" },
    { date: "Feb 05, 2025", status: "present" },
  ],
  4: [
    { date: "Feb 10, 2025", status: "present" },
    { date: "Feb 11, 2025", status: "present" },
    { date: "Feb 12, 2025", status: "present" },
  ],
  5: [
    { date: "Feb 20, 2025", status: "absent" },
    { date: "Feb 21, 2025", status: "absent" },
    { date: "Feb 22, 2025", status: "present" },
  ],
};

interface StudentDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
  batchId: number;
  program: string;
  enrollmentId: string;
  status: string;
  joinDate: string;
  createdAt: string;
}

export default function AdminStudentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [mcqFilter, setMcqFilter] = useState<"all" | "correct" | "incorrect">("all");
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`/api/students/${id}`);
        if (!response.ok) {
          throw new Error("Student not found");
        }
        const data = await response.json();
        setStudent(data.student);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch student");
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-foreground/70">Loading student information...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!student || error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-foreground/70">{error || "Student not found"}</p>
              <Button onClick={() => navigate("/admin/students")} className="mt-4">
                Back to Students
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Use batchId as a fallback for mock data lookups
  const mockDataId = student.batchId || 1;
  const courses = coursesData[mockDataId] || [];
  const exams = examsData[mockDataId] || [];
  const attendance = attendanceData[mockDataId] || [];
  const selectedExamData = exams.find((e) => e.id === selectedExam);

  const filteredMcqs = selectedExamData
    ? selectedExamData.mcqs.filter((mcq: any) => {
        if (mcqFilter === "all") return true;
        if (mcqFilter === "correct") return mcq.isCorrect;
        if (mcqFilter === "incorrect") return !mcq.isCorrect;
        return true;
      })
    : [];

  const presentCount = attendance.filter((a) => a.status === "present").length;
  const absentCount = attendance.filter((a) => a.status === "absent").length;
  const attendancePercentage =
    attendance.length > 0
      ? Math.round((presentCount / attendance.length) * 100)
      : 0;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/students")}
            className="mb-8 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-foreground/70">{student.enrollmentId}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-xs text-foreground/60 mb-2">Enrollment ID</p>
                <p className="text-xl font-bold text-foreground">
                  {student.enrollmentId}
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-xs text-foreground/60 mb-2">Program</p>
                <p className="text-xl font-bold text-foreground">
                  {student.program}
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-xs text-foreground/60 mb-2">Status</p>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    student.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-xs text-foreground/60 mb-2">Join Date</p>
                <p className="text-xl font-bold text-foreground">
                  {new Date(student.joinDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 border border-primary/20">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            {/* Personal Details Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-foreground/60 mb-2">Full Name</p>
                      <p className="text-lg font-semibold text-foreground">
                        {student.firstName} {student.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-2">
                        Date of Birth
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {student.dateOfBirth}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-foreground/60">Email</p>
                        <a
                          href={`mailto:${student.email}`}
                          className="text-primary hover:underline"
                        >
                          {student.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-foreground/60">Phone</p>
                        <p className="font-semibold text-foreground">
                          {student.phone}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-2">
                        Father Name
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {student.fatherName}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-primary/20 pt-4">
                    <p className="text-xs text-foreground/60 mb-2">Address</p>
                    <p className="text-lg font-semibold text-foreground">
                      {student.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-foreground/60 mb-2">Batch ID</p>
                      <p className="font-semibold text-foreground">
                        {student.batchId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-2">Program</p>
                      <p className="font-semibold text-foreground">
                        {student.program}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-foreground/60">Join Date</p>
                        <p className="font-semibold text-foreground">
                          {new Date(student.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              {courses.length === 0 ? (
                <Card className="border-primary/20 bg-white">
                  <CardContent className="pt-6">
                    <p className="text-center text-foreground/70">
                      No courses enrolled
                    </p>
                  </CardContent>
                </Card>
              ) : (
                courses.map((course) => (
                  <Card key={course.id} className="border-primary/20 bg-white">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">
                            {course.name}
                          </h3>
                          <p className="text-sm text-foreground/70">
                            Instructor: {course.instructor}
                          </p>
                        </div>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                          {course.status}
                        </span>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-foreground/70">
                            Progress
                          </p>
                          <p className="font-semibold text-foreground">
                            {course.progress}%
                          </p>
                        </div>
                        <div className="w-full bg-primary/10 rounded-full h-3">
                          <div
                            className="bg-primary h-3 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Exams Tab */}
            <TabsContent value="exams" className="space-y-6">
              {selectedExam ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedExam(null)}
                    className="text-primary hover:text-primary/80"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Exams
                  </Button>

                  {selectedExamData && (
                    <Card className="border-primary/20 bg-white">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{selectedExamData.name}</CardTitle>
                            <p className="text-sm text-foreground/70 mt-2">
                              {selectedExamData.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-foreground/70 mb-1">
                              Score
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              {selectedExamData.obtainedMarks}/
                              {selectedExamData.totalMarks}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* MCQ Filter */}
                        <div className="flex gap-2">
                          <Button
                            variant={
                              mcqFilter === "all" ? "default" : "outline"
                            }
                            onClick={() => setMcqFilter("all")}
                            className="flex items-center gap-2"
                          >
                            <Filter className="h-4 w-4" />
                            All ({selectedExamData.mcqs.length})
                          </Button>
                          <Button
                            variant={
                              mcqFilter === "correct" ? "default" : "outline"
                            }
                            onClick={() => setMcqFilter("correct")}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Correct (
                            {
                              selectedExamData.mcqs.filter(
                                (m: any) => m.isCorrect
                              ).length
                            }
                            )
                          </Button>
                          <Button
                            variant={
                              mcqFilter === "incorrect"
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setMcqFilter("incorrect")}
                            className="flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Incorrect (
                            {
                              selectedExamData.mcqs.filter(
                                (m: any) => !m.isCorrect
                              ).length
                            }
                            )
                          </Button>
                        </div>

                        {/* MCQs Display */}
                        <div className="space-y-6 mt-6">
                          {filteredMcqs.length === 0 ? (
                            <p className="text-center text-foreground/70">
                              No questions found
                            </p>
                          ) : (
                            filteredMcqs.map((mcq: any, idx: number) => (
                              <div
                                key={mcq.id}
                                className={`border-l-4 p-4 rounded ${
                                  mcq.isCorrect
                                    ? "border-green-500 bg-green-50"
                                    : "border-red-500 bg-red-50"
                                }`}
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-semibold text-foreground">
                                    Q{idx + 1}. {mcq.question}
                                  </h4>
                                  {mcq.isCorrect ? (
                                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                                  )}
                                </div>

                                <div className="space-y-2 mb-3">
                                  {mcq.options.map(
                                    (option: string, optIdx: number) => {
                                      const isCorrectOption =
                                        option === mcq.correctAnswer;
                                      const isStudentAnswer =
                                        option === mcq.studentAnswer;

                                      return (
                                        <div
                                          key={optIdx}
                                          className={`p-2 rounded border ${
                                            isCorrectOption
                                              ? "border-green-400 bg-green-100"
                                              : isStudentAnswer &&
                                                  !mcq.isCorrect
                                                ? "border-red-400 bg-red-100"
                                                : "border-gray-200 bg-white"
                                          }`}
                                        >
                                          <p className="text-sm text-foreground">
                                            {option}
                                            {isCorrectOption && (
                                              <span className="ml-2 text-green-700 font-semibold">
                                                (Correct)
                                              </span>
                                            )}
                                            {isStudentAnswer &&
                                              !isCorrectOption && (
                                                <span className="ml-2 text-red-700 font-semibold">
                                                  (Your Answer)
                                                </span>
                                              )}
                                          </p>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <>
                  {exams.length === 0 ? (
                    <Card className="border-primary/20 bg-white">
                      <CardContent className="pt-6">
                        <p className="text-center text-foreground/70">
                          No exams taken
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    exams.map((exam) => {
                      const percentage = Math.round(
                        (exam.obtainedMarks / exam.totalMarks) * 100
                      );
                      return (
                        <Card
                          key={exam.id}
                          className="border-primary/20 bg-white hover:shadow-lg cursor-pointer transition-shadow"
                          onClick={() => setSelectedExam(exam.id)}
                        >
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-bold text-foreground">
                                  {exam.name}
                                </h3>
                                <p className="text-sm text-foreground/70">
                                  {exam.date}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-foreground/70 mb-1">
                                  Score
                                </p>
                                <p className="text-2xl font-bold text-primary">
                                  {exam.obtainedMarks}/{exam.totalMarks}
                                </p>
                                <p className="text-sm font-semibold text-foreground mt-1">
                                  {percentage}%
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="w-full bg-primary/10 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full ${
                                    percentage >= 70
                                      ? "bg-green-500"
                                      : percentage >= 50
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </>
              )}
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-sm text-foreground/70 mb-1">Present</p>
                      <p className="text-2xl font-bold text-green-600">
                        {presentCount}
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-foreground/70 mb-1">Absent</p>
                      <p className="text-2xl font-bold text-red-600">
                        {absentCount}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-foreground/70 mb-1">
                        Percentage
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        {attendancePercentage}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendance.map((record, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-primary/10 hover:bg-primary/5"
                          >
                            <td className="py-3 px-4 text-foreground">
                              {record.date}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                  record.status === "present"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {record.status.charAt(0).toUpperCase() +
                                  record.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
