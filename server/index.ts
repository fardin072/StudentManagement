import "dotenv/config";
import express from "express";
import cors from "cors";
import { initializeDatabase } from "./db";
import { seedDatabase } from "./seed";
import { handleDemo } from "./routes/demo";
import {
  getAllMCQSets,
  getMCQSet,
  createMCQSet,
  updateMCQSet,
  deleteMCQSet,
} from "./routes/mcq";
import {
  getAllAdmissions,
  getAdmission,
  createAdmission,
  approveAdmission,
  rejectAdmission,
  deleteAdmission,
} from "./routes/admission";
import {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./routes/students";
import {
  getAllBatches,
  getBatch,
  createBatch,
  updateBatch,
  deleteBatch,
} from "./routes/batches";
import {
  getAllCourses,
  getCourse,
  getStudentCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./routes/courses";
import {
  getAllMaterials,
  getMaterialsByBatch,
  getMaterialsByCourse,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "./routes/materials";

export async function createServer() {
  // Initialize database
  await initializeDatabase();
  await seedDatabase();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // MCQ Management routes
  app.get("/api/mcq-sets", getAllMCQSets);
  app.get("/api/mcq-sets/:id", getMCQSet);
  app.post("/api/mcq-sets", createMCQSet);
  app.put("/api/mcq-sets/:id", updateMCQSet);
  app.delete("/api/mcq-sets/:id", deleteMCQSet);

  // Admission Management routes
  app.get("/api/admissions", getAllAdmissions);
  app.get("/api/admissions/:id", getAdmission);
  app.post("/api/admissions", createAdmission);
  app.post("/api/admissions/:id/approve", approveAdmission);
  app.post("/api/admissions/:id/reject", rejectAdmission);
  app.delete("/api/admissions/:id", deleteAdmission);

  // Student Management routes
  app.get("/api/students", getAllStudents);
  app.get("/api/students/:id", getStudent);
  app.post("/api/students", createStudent);
  app.put("/api/students/:id", updateStudent);
  app.delete("/api/students/:id", deleteStudent);

  // Batch Management routes
  app.get("/api/batches", getAllBatches);
  app.get("/api/batches/:id", getBatch);
  app.post("/api/batches", createBatch);
  app.put("/api/batches/:id", updateBatch);
  app.delete("/api/batches/:id", deleteBatch);

  // Course Management routes
  app.get("/api/courses", getAllCourses);
  app.get("/api/courses/:id", getCourse);
  app.get("/api/students/:studentId/courses", getStudentCourses);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);

  // Study Materials Management routes
  app.get("/api/materials", getAllMaterials);
  app.get("/api/materials/batch/:batchId", getMaterialsByBatch);
  app.get("/api/materials/course/:courseId", getMaterialsByCourse);
  app.post("/api/materials", createMaterial);
  app.put("/api/materials/:id", updateMaterial);
  app.delete("/api/materials/:id", deleteMaterial);

  return app;
}
