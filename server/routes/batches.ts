import { RequestHandler } from "express";
import { dbRun, dbGet, dbAll } from "../db";

interface Batch {
  id: number;
  name: string;
  program: string;
  fee: string;
  createdAt: string;
  updatedAt: string;
}

// Get all batches
export const getAllBatches: RequestHandler = async (req, res) => {
  try {
    const batches = await dbAll<Batch>(
      "SELECT * FROM batches ORDER BY name"
    );
    res.json({ batches });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch batches" });
  }
};

// Get single batch
export const getBatch: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const batch = await dbGet<Batch>(
      "SELECT * FROM batches WHERE id = ?",
      [parseInt(req.params.id)]
    );

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    res.json({ batch });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch batch" });
  }
};

// Create new batch
export const createBatch: RequestHandler<{}, {}, Partial<Batch>> = async (
  req,
  res
) => {
  try {
    const { name, program, fee } = req.body;

    if (!name || !program || !fee) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const now = new Date().toISOString();

    await dbRun(
      `INSERT INTO batches (name, program, fee, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?)`,
      [name, program, fee, now, now]
    );

    const batch = await dbGet<Batch>(
      "SELECT * FROM batches WHERE name = ?",
      [name]
    );

    res.status(201).json({ batch });
  } catch (err) {
    console.error("Error creating batch:", err);
    res.status(500).json({ error: "Failed to create batch" });
  }
};

// Update batch
export const updateBatch: RequestHandler<{ id: string }, {}, Partial<Batch>> = async (
  req,
  res
) => {
  try {
    const batch = await dbGet<Batch>(
      "SELECT * FROM batches WHERE id = ?",
      [parseInt(req.params.id)]
    );

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (req.body.name) {
      updates.push("name = ?");
      values.push(req.body.name);
    }
    if (req.body.program) {
      updates.push("program = ?");
      values.push(req.body.program);
    }
    if (req.body.fee) {
      updates.push("fee = ?");
      values.push(req.body.fee);
    }

    if (updates.length > 0) {
      updates.push("updatedAt = ?");
      values.push(new Date().toISOString());
      values.push(parseInt(req.params.id));

      await dbRun(
        `UPDATE batches SET ${updates.join(", ")} WHERE id = ?`,
        values
      );
    }

    const updated = await dbGet<Batch>(
      "SELECT * FROM batches WHERE id = ?",
      [parseInt(req.params.id)]
    );

    res.json({ batch: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update batch" });
  }
};

// Delete batch
export const deleteBatch: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const batch = await dbGet(
      "SELECT id FROM batches WHERE id = ?",
      [parseInt(req.params.id)]
    );

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    // Don't delete if students are enrolled
    const studentCount = await dbGet<{ count: number }>(
      "SELECT COUNT(*) as count FROM students WHERE batchId = ?",
      [parseInt(req.params.id)]
    );

    if ((studentCount?.count || 0) > 0) {
      return res.status(400).json({
        error: "Cannot delete batch with enrolled students",
      });
    }

    await dbRun("DELETE FROM batches WHERE id = ?", [parseInt(req.params.id)]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete batch" });
  }
};
