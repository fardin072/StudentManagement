import { RequestHandler } from "express";
import { db, dbRun, dbGet, dbAll, randomUUID } from "../db";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "..", "..", "public", "materials");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

interface StudyMaterial {
  id: string;
  title: string;
  description?: string;
  batchId?: number;
  courseId?: string;
  fileType: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllMaterials: RequestHandler = async (_req, res) => {
  try {
    const materials = await dbAll<StudyMaterial>(
      `SELECT * FROM study_materials ORDER BY createdAt DESC`
    );
    res.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ error: "Failed to fetch materials" });
  }
};

export const getMaterialsByBatch: RequestHandler = async (req, res) => {
  try {
    const { batchId } = req.params;
    const materials = await dbAll<StudyMaterial>(
      `SELECT * FROM study_materials WHERE batchId = ? ORDER BY createdAt DESC`,
      [batchId]
    );
    res.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ error: "Failed to fetch materials" });
  }
};

export const getMaterialsByCourse: RequestHandler = async (req, res) => {
  try {
    const { courseId } = req.params;
    const materials = await dbAll<StudyMaterial>(
      `SELECT * FROM study_materials WHERE courseId = ? ORDER BY createdAt DESC`,
      [courseId]
    );
    res.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ error: "Failed to fetch materials" });
  }
};

export const createMaterial: RequestHandler = async (req, res) => {
  try {
    const { title, description, batchId, courseId, fileType, fileName, fileSize, uploadedBy } = req.body;

    if (!title || !fileName || !uploadedBy) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const id = randomUUID();
    const now = new Date().toISOString();

    await dbRun(
      `INSERT INTO study_materials (id, title, description, batchId, courseId, fileType, fileName, fileSize, uploadedBy, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, description || null, batchId || null, courseId || null, fileType || "pdf", fileName, fileSize || "0 B", uploadedBy, now, now]
    );

    const material = await dbGet<StudyMaterial>(
      `SELECT * FROM study_materials WHERE id = ?`,
      [id]
    );

    res.status(201).json(material);
  } catch (error) {
    console.error("Error creating material:", error);
    res.status(500).json({ error: "Failed to create material" });
  }
};

export const updateMaterial: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, batchId, courseId } = req.body;

    const now = new Date().toISOString();

    await dbRun(
      `UPDATE study_materials SET title = ?, description = ?, batchId = ?, courseId = ?, updatedAt = ? WHERE id = ?`,
      [title, description || null, batchId || null, courseId || null, now, id]
    );

    const material = await dbGet<StudyMaterial>(
      `SELECT * FROM study_materials WHERE id = ?`,
      [id]
    );

    res.json(material);
  } catch (error) {
    console.error("Error updating material:", error);
    res.status(500).json({ error: "Failed to update material" });
  }
};

export const deleteMaterial: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Get material to find file
    const material = await dbGet<StudyMaterial>(
      `SELECT * FROM study_materials WHERE id = ?`,
      [id]
    );

    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    // Delete file from storage
    const filePath = path.join(uploadsDir, material.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await dbRun(`DELETE FROM study_materials WHERE id = ?`, [id]);

    res.json({ success: true, message: "Material deleted successfully" });
  } catch (error) {
    console.error("Error deleting material:", error);
    res.status(500).json({ error: "Failed to delete material" });
  }
};
