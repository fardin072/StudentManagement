import sqlite3 from "sqlite3";
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "..", "data.db");

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to SQLite database at", dbPath);
  }
});

// Enable foreign keys
db.run("PRAGMA foreign_keys = ON");

// Promisify database operations
function dbRun(sql: string, params: any[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function dbGet<T>(sql: string, params: any[] = []): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row as T | undefined);
    });
  });
}

function dbAll<T>(sql: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve((rows || []) as T[]);
    });
  });
}

// Create tables if they don't exist
async function initializeDatabase() {
  try {
    // Batches table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS batches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        program TEXT NOT NULL,
        fee TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);

    // Students table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        dateOfBirth TEXT NOT NULL,
        fatherName TEXT NOT NULL,
        address TEXT NOT NULL,
        batchId INTEGER NOT NULL,
        program TEXT NOT NULL,
        enrollmentId TEXT NOT NULL UNIQUE,
        admissionId TEXT,
        status TEXT NOT NULL,
        joinDate TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY(batchId) REFERENCES batches(id)
      )
    `);

    // Courses table (for students enrolled in multiple courses)
    await dbRun(`
      CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        description TEXT,
        createdAt TEXT NOT NULL
      )
    `);

    // Student Courses (many-to-many)
    await dbRun(`
      CREATE TABLE IF NOT EXISTS student_courses (
        id TEXT PRIMARY KEY,
        studentId TEXT NOT NULL,
        courseId TEXT NOT NULL,
        enrollmentDate TEXT NOT NULL,
        FOREIGN KEY(studentId) REFERENCES students(id),
        FOREIGN KEY(courseId) REFERENCES courses(id)
      )
    `);

    // Admissions table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS admissions (
        id TEXT PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        dateOfBirth TEXT NOT NULL,
        fatherName TEXT NOT NULL,
        address TEXT NOT NULL,
        batchId INTEGER NOT NULL,
        program TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        rejectionReason TEXT,
        FOREIGN KEY(batchId) REFERENCES batches(id)
      )
    `);

    // MCQ Sets table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS mcq_sets (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        topic TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        questions TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);

    // Study Materials table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS study_materials (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        batchId INTEGER,
        courseId TEXT,
        fileType TEXT NOT NULL,
        fileName TEXT NOT NULL,
        fileSize TEXT NOT NULL,
        uploadedBy TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY(batchId) REFERENCES batches(id),
        FOREIGN KEY(courseId) REFERENCES courses(id)
      )
    `);

    console.log("Database tables created successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

export { db, dbRun, dbGet, dbAll, initializeDatabase, randomUUID };
