import { RequestHandler } from "express";
import {
  Student,
  CreateStudentRequest,
  StudentsResponse,
  StudentResponse,
} from "@shared/api";
import { dbRun, dbGet, dbAll, randomUUID } from "../db";

// Get all students with optional filtering
export const getAllStudents: RequestHandler<
  {},
  {},
  {},
  { batch?: string; status?: string }
> = async (req, res) => {
  try {
    const { batch, status } = req.query;

    let query = "SELECT * FROM students";
    const params: any[] = [];

    if (batch) {
      query += " AND batchId = ?";
      params.push(parseInt(batch as string));
    }

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }

    query = query.replace(" AND ", " WHERE "); // Replace first AND with WHERE

    const students = await dbAll<Student>(query, params);
    const response: StudentsResponse = { students };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Get single student
export const getStudent: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const student = await dbGet<Student>(
      "SELECT * FROM students WHERE id = ?",
      [req.params.id]
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const response: StudentResponse = { student };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

// Create new student
export const createStudent: RequestHandler<{}, {}, CreateStudentRequest> = async (
  req,
  res
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      fatherName,
      address,
      batchId,
      program,
      admissionId,
    } = req.body;

    // Validate request
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !fatherName ||
      !address ||
      !batchId ||
      !program ||
      !admissionId
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check for duplicate email
    const existing = await dbGet(
      "SELECT id FROM students WHERE email = ?",
      [email]
    );
    if (existing) {
      return res.status(400).json({
        error: "A student with this email already exists",
      });
    }

    // Count students to generate enrollment ID
    const count = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM students"
    );
    const enrollmentId = `STU${String((count?.count || 0) + 1).padStart(5, "0")}`;

    const studentId = randomUUID();
    const now = new Date().toISOString();

    await dbRun(
      `INSERT INTO students (
        id, firstName, lastName, email, phone, dateOfBirth, fatherName, address,
        batchId, program, enrollmentId, admissionId, status, joinDate, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentId,
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        fatherName,
        address,
        batchId,
        program,
        enrollmentId,
        admissionId,
        "active",
        now.split("T")[0],
        now,
      ]
    );

    const student: Student = {
      id: studentId,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      fatherName,
      address,
      batchId,
      program,
      enrollmentId,
      admissionId,
      status: "active",
      joinDate: now.split("T")[0],
      createdAt: now,
    };

    res.status(201).json({ student });
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(500).json({ error: "Failed to create student" });
  }
};

// Update student
export const updateStudent: RequestHandler<{ id: string }, {}, Partial<Student>> = async (
  req,
  res
) => {
  try {
    const student = await dbGet<Student>(
      "SELECT * FROM students WHERE id = ?",
      [req.params.id]
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update allowed fields
    if (req.body.status) {
      await dbRun("UPDATE students SET status = ? WHERE id = ?", [
        req.body.status,
        req.params.id,
      ]);
    }
    if (req.body.phone) {
      await dbRun("UPDATE students SET phone = ? WHERE id = ?", [
        req.body.phone,
        req.params.id,
      ]);
    }
    if (req.body.address) {
      await dbRun("UPDATE students SET address = ? WHERE id = ?", [
        req.body.address,
        req.params.id,
      ]);
    }

    // Fetch updated student
    const updated = await dbGet<Student>(
      "SELECT * FROM students WHERE id = ?",
      [req.params.id]
    );

    res.json({ student: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update student" });
  }
};

// Delete student
export const deleteStudent: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const student = await dbGet(
      "SELECT id FROM students WHERE id = ?",
      [req.params.id]
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Delete student courses first
    await dbRun("DELETE FROM student_courses WHERE studentId = ?", [req.params.id]);

    // Delete student
    await dbRun("DELETE FROM students WHERE id = ?", [req.params.id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};
