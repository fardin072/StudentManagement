import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import StudentPanel from "./pages/StudentPanel";
import AdminPanel from "./pages/AdminPanel";
import Placeholder from "./pages/Placeholder";
import About from "./pages/About";
import Alumni from "./pages/Alumni";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import StudentDashboard from "./pages/StudentDashboard";
import StudentAttendance from "./pages/StudentAttendance";
import StudentExam from "./pages/StudentExam";
import StudentMaterials from "./pages/StudentMaterials";
import StudentAnalytics from "./pages/StudentAnalytics";
import StudentMCQ from "./pages/StudentMCQ";
import StudentFee from "./pages/StudentFee";
import StudentNotices from "./pages/StudentNotices";
import StudentSettings from "./pages/StudentSettings";
import StudentMCQExam from "./pages/StudentMCQExam";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminBatches from "./pages/AdminBatches";
import AdminAttendance from "./pages/AdminAttendance";
import AdminExams from "./pages/AdminExams";
import AdminMCQ from "./pages/AdminMCQ";
import AdminMCQDetail from "./pages/AdminMCQDetail";
import AdminFees from "./pages/AdminFees";
import AdminNotices from "./pages/AdminNotices";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import AdminEvents from "./pages/AdminEvents";
import AdminStudentDetail from "./pages/AdminStudentDetail";
import AdminBatchDetail from "./pages/AdminBatchDetail";
import Admission from "./pages/Admission";
import AdminAdmissions from "./pages/AdminAdmissions";
import AdminMaterials from "./pages/AdminMaterials";
import { syncDatabaseFromServer } from "./lib/indexeddb-sync";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize IndexedDB with server data on app load
    syncDatabaseFromServer().catch((error) => {
      console.error("Failed to initialize database:", error);
    });
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admission" element={<Admission />} />
          <Route
            path="/forgot-password"
            element={
              <Placeholder
                title="Reset Your Password"
                description="Enter your email address and we'll send you a link to reset your password."
              />
            }
          />

          {/* Student Panel Routes */}
          <Route path="/student/panel" element={<StudentPanel />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/exam" element={<StudentExam />} />
          <Route path="/student/materials" element={<StudentMaterials />} />
          <Route path="/student/analytics" element={<StudentAnalytics />} />
          <Route path="/student/mcq" element={<StudentMCQ />} />
          <Route path="/student/fee" element={<StudentFee />} />
          <Route path="/student/notices" element={<StudentNotices />} />
          <Route path="/student/settings" element={<StudentSettings />} />

          {/* Admin Panel Routes */}
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/admissions" element={<AdminAdmissions />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/students/:id" element={<AdminStudentDetail />} />
          <Route path="/admin/batches" element={<AdminBatches />} />
          <Route path="/admin/batches/:id" element={<AdminBatchDetail />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/exams" element={<AdminExams />} />
          <Route path="/admin/mcq" element={<AdminMCQ />} />
          <Route path="/admin/mcq/:id" element={<AdminMCQDetail />} />
          <Route path="/admin/fees" element={<AdminFees />} />
          <Route path="/admin/notices" element={<AdminNotices />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/materials" element={<AdminMaterials />} />

          {/* Catch-all 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
