import { RequestHandler } from "express";
import {
  MCQSet,
  CreateMCQSetRequest,
  MCQSetsResponse,
  MCQSetResponse,
} from "@shared/api";
import { dbRun, dbGet, dbAll, randomUUID } from "../db";

// Get all MCQ sets
export const getAllMCQSets: RequestHandler = async (req, res) => {
  try {
    const rows = await dbAll<{ id: string; title: string; topic: string; difficulty: string; questions: string; createdAt: string; updatedAt: string }>(
      "SELECT * FROM mcq_sets ORDER BY createdAt DESC"
    );

    const sets = rows.map((row) => ({
      ...row,
      questions: JSON.parse(row.questions),
    }));

    const response: MCQSetsResponse = { sets };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch MCQ sets" });
  }
};

// Get single MCQ set
export const getMCQSet: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const row = await dbGet<{ id: string; title: string; topic: string; difficulty: string; questions: string; createdAt: string; updatedAt: string }>(
      "SELECT * FROM mcq_sets WHERE id = ?",
      [req.params.id]
    );

    if (!row) {
      return res.status(404).json({ error: "MCQ set not found" });
    }

    const set: MCQSet = {
      ...row,
      questions: JSON.parse(row.questions),
    };

    const response: MCQSetResponse = { set };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch MCQ set" });
  }
};

// Create new MCQ set
export const createMCQSet: RequestHandler<{}, {}, CreateMCQSetRequest> = async (
  req,
  res
) => {
  try {
    const { title, topic, difficulty, questions } = req.body;

    // Validate request
    if (!title || !topic || !difficulty || !questions || questions.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const id = randomUUID();
    const now = new Date().toISOString();

    // Convert questions format
    const formattedQuestions = questions.map((q, idx) => ({
      id: randomUUID(),
      question: q.question,
      options: q.options.map((text, optIdx) => ({
        id: randomUUID(),
        text,
      })),
      correctOptionId: randomUUID(), // This would normally be set properly
    }));

    await dbRun(
      `INSERT INTO mcq_sets (id, title, topic, difficulty, questions, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, title, topic, difficulty, JSON.stringify(formattedQuestions), now, now]
    );

    const set: MCQSet = {
      id,
      title,
      topic,
      difficulty: difficulty as "easy" | "medium" | "hard",
      questions: formattedQuestions,
      createdAt: now,
      updatedAt: now,
    };

    res.status(201).json({ set });
  } catch (err) {
    console.error("Error creating MCQ set:", err);
    res.status(500).json({ error: "Failed to create MCQ set" });
  }
};

// Update MCQ set
export const updateMCQSet: RequestHandler<{ id: string }, {}, Partial<MCQSet>> = async (
  req,
  res
) => {
  try {
    const set = await dbGet(
      "SELECT * FROM mcq_sets WHERE id = ?",
      [req.params.id]
    );

    if (!set) {
      return res.status(404).json({ error: "MCQ set not found" });
    }

    const now = new Date().toISOString();

    if (req.body.title) {
      await dbRun("UPDATE mcq_sets SET title = ?, updatedAt = ? WHERE id = ?", [
        req.body.title,
        now,
        req.params.id,
      ]);
    }

    if (req.body.topic) {
      await dbRun("UPDATE mcq_sets SET topic = ?, updatedAt = ? WHERE id = ?", [
        req.body.topic,
        now,
        req.params.id,
      ]);
    }

    if (req.body.difficulty) {
      await dbRun(
        "UPDATE mcq_sets SET difficulty = ?, updatedAt = ? WHERE id = ?",
        [req.body.difficulty, now, req.params.id]
      );
    }

    if (req.body.questions) {
      const formattedQuestions = req.body.questions;
      await dbRun(
        "UPDATE mcq_sets SET questions = ?, updatedAt = ? WHERE id = ?",
        [JSON.stringify(formattedQuestions), now, req.params.id]
      );
    }

    const updated = await dbGet<{ id: string; title: string; topic: string; difficulty: string; questions: string; createdAt: string; updatedAt: string }>(
      "SELECT * FROM mcq_sets WHERE id = ?",
      [req.params.id]
    );

    const result: MCQSet = {
      ...updated!,
      questions: JSON.parse(updated!.questions),
    };

    res.json({ set: result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update MCQ set" });
  }
};

// Delete MCQ set
export const deleteMCQSet: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const set = await dbGet(
      "SELECT id FROM mcq_sets WHERE id = ?",
      [req.params.id]
    );

    if (!set) {
      return res.status(404).json({ error: "MCQ set not found" });
    }

    await dbRun("DELETE FROM mcq_sets WHERE id = ?", [req.params.id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete MCQ set" });
  }
};
