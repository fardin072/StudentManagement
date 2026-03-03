/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * MCQ Types
 */
export interface MCQOption {
  id: string;
  text: string;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: MCQOption[];
  correctOptionId: string;
}

export interface MCQSet {
  id: string;
  title: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  questions: MCQQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMCQSetRequest {
  title: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  questions: Array<{
    question: string;
    options: string[];
    correctOptionIndex: number;
  }>;
}

export interface MCQSetsResponse {
  sets: MCQSet[];
}

export interface MCQSetResponse {
  set: MCQSet;
}

/**
 * Admission/Enrollment Types
 */
export interface AdmissionRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
  batchId: number;
  program: "Standard" | "Advanced" | "Professional";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  rejectionReason?: string;
}

export interface CreateAdmissionRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
  batchId: number;
  program: "Standard" | "Advanced" | "Professional";
}

export interface AdmissionsResponse {
  admissions: AdmissionRequest[];
}

export interface AdmissionResponse {
  admission: AdmissionRequest;
}

/**
 * Student Types (approved admissions become students)
 */
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
  batchId: number;
  program: "Standard" | "Advanced" | "Professional";
  enrollmentId: string;
  admissionId: string; // Link to the original admission
  status: "active" | "inactive";
  joinDate: string;
  createdAt: string;
}

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
  batchId: number;
  program: "Standard" | "Advanced" | "Professional";
  admissionId: string;
}

export interface StudentsResponse {
  students: Student[];
}

export interface StudentResponse {
  student: Student;
}
