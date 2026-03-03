import { RequestHandler } from "express";
import { dbRun, dbGet, dbAll, randomUUID } from "../db";

interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
}

// Get all courses
export const getAllCourses: RequestHandler = async (req, res) => {
  try {
    const courses = await dbAll<Course>(
      "SELECT * FROM courses ORDER BY name"
    );
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Get single course
export const getCourse: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const course = await dbGet<Course>(
      "SELECT * FROM courses WHERE id = ?",
      [req.params.id]
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ course });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

// Get all courses for a student
export const getStudentCourses: RequestHandler<{ studentId: string }> = async (req, res) => {
  try {
    const courses = await dbAll<Course>(
      `SELECT c.* FROM courses c
       INNER JOIN student_courses sc ON c.id = sc.courseId
       WHERE sc.studentId = ?
       ORDER BY c.name`,
      [req.params.studentId]
    );

    res.json({ courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student courses" });
  }
};

// Create new course
export const createCourse: RequestHandler<{}, {}, Partial<Course>> = async (
  req,
  res
) => {
  try {
    const { name, code, description } = req.body;

    if (!name || !code) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const id = randomUUID();
    const now = new Date().toISOString();

    await dbRun(
      `INSERT INTO courses (id, name, code, description, createdAt)
       VALUES (?, ?, ?, ?, ?)`,
      [id, name, code, description || null, now]
    );

    const course: Course = {
      id,
      name,
      code,
      description,
      createdAt: now,
    };

    res.status(201).json({ course });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ error: "Failed to create course" });
  }
};

// Update course
export const updateCourse: RequestHandler<{ id: string }, {}, Partial<Course>> = async (
  req,
  res
) => {
  try {
    const course = await dbGet<Course>(
      "SELECT * FROM courses WHERE id = ?",
      [req.params.id]
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (req.body.name) {
      await dbRun("UPDATE courses SET name = ? WHERE id = ?", [
        req.body.name,
        req.params.id,
      ]);
    }
    if (req.body.code) {
      await dbRun("UPDATE courses SET code = ? WHERE id = ?", [
        req.body.code,
        req.params.id,
      ]);
    }
    if (req.body.description) {
      await dbRun("UPDATE courses SET description = ? WHERE id = ?", [
        req.body.description,
        req.params.id,
      ]);
    }

    const updated = await dbGet<Course>(
      "SELECT * FROM courses WHERE id = ?",
      [req.params.id]
    );

    res.json({ course: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update course" });
  }
};

// Delete course
export const deleteCourse: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const course = await dbGet(
      "SELECT id FROM courses WHERE id = ?",
      [req.params.id]
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Delete course enrollments first
    await dbRun("DELETE FROM student_courses WHERE courseId = ?", [req.params.id]);

    // Delete course
    await dbRun("DELETE FROM courses WHERE id = ?", [req.params.id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course" });
  }
};
