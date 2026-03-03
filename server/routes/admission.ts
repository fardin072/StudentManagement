import { RequestHandler } from "express";
import {
  AdmissionRequest,
  CreateAdmissionRequest,
  AdmissionsResponse,
  AdmissionResponse,
} from "@shared/api";
import { dbRun, dbGet, dbAll, randomUUID } from "../db";

// Get all admission requests (with optional status filter)
export const getAllAdmissions: RequestHandler<
  {},
  {},
  {},
  { status?: string }
> = async (req, res) => {
  try {
    const { status } = req.query;

    let query = "SELECT * FROM admissions";
    const params: any[] = [];

    if (status && status !== "all") {
      query += " WHERE status = ?";
      params.push(status);
    }

    query += " ORDER BY createdAt DESC";

    const admissions = await dbAll<AdmissionRequest>(query, params);
    const response: AdmissionsResponse = { admissions };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admissions" });
  }
};

// Get single admission request
export const getAdmission: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const admission = await dbGet<AdmissionRequest>(
      "SELECT * FROM admissions WHERE id = ?",
      [req.params.id]
    );

    if (!admission) {
      return res.status(404).json({ error: "Admission request not found" });
    }

    const response: AdmissionResponse = { admission };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admission" });
  }
};

// Create new admission request
export const createAdmission: RequestHandler<
  {},
  {},
  CreateAdmissionRequest
> = async (req, res) => {
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
      !program
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check for duplicate email
    const existing = await dbGet(
      "SELECT id FROM admissions WHERE email = ?",
      [email]
    );
    if (existing) {
      return res.status(400).json({
        error: "An admission request with this email already exists",
      });
    }

    const admissionId = randomUUID();
    const now = new Date().toISOString();

    await dbRun(
      `INSERT INTO admissions (
        id, firstName, lastName, email, phone, dateOfBirth, fatherName, address,
        batchId, program, status, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        admissionId,
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        fatherName,
        address,
        batchId,
        program,
        "pending",
        now,
      ]
    );

    const admission: AdmissionRequest = {
      id: admissionId,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      fatherName,
      address,
      batchId,
      program,
      status: "pending",
      createdAt: now,
    };

    res.status(201).json({ admission });
  } catch (err) {
    console.error("Error creating admission:", err);
    res.status(500).json({ error: "Failed to create admission request" });
  }
};

// Approve admission request
export const approveAdmission: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const admission = await dbGet<AdmissionRequest>(
      "SELECT * FROM admissions WHERE id = ?",
      [req.params.id]
    );

    if (!admission) {
      return res.status(404).json({ error: "Admission request not found" });
    }

    if (admission.status !== "pending") {
      return res.status(400).json({
        error: "Can only approve pending admission requests",
      });
    }

    await dbRun("UPDATE admissions SET status = ? WHERE id = ?", [
      "approved",
      req.params.id,
    ]);

    const updated = await dbGet<AdmissionRequest>(
      "SELECT * FROM admissions WHERE id = ?",
      [req.params.id]
    );

    const response: AdmissionResponse = { admission: updated! };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to approve admission" });
  }
};

// Reject admission request
export const rejectAdmission: RequestHandler<
  { id: string },
  {},
  { reason?: string }
> = async (req, res) => {
  try {
    const admission = await dbGet<AdmissionRequest>(
      "SELECT * FROM admissions WHERE id = ?",
      [req.params.id]
    );

    if (!admission) {
      return res.status(404).json({ error: "Admission request not found" });
    }

    if (admission.status !== "pending") {
      return res.status(400).json({
        error: "Can only reject pending admission requests",
      });
    }

    const reason = req.body.reason || "Not specified";
    await dbRun(
      "UPDATE admissions SET status = ?, rejectionReason = ? WHERE id = ?",
      ["rejected", reason, req.params.id]
    );

    const updated = await dbGet<AdmissionRequest>(
      "SELECT * FROM admissions WHERE id = ?",
      [req.params.id]
    );

    const response: AdmissionResponse = { admission: updated! };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to reject admission" });
  }
};

// Delete admission request
export const deleteAdmission: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const admission = await dbGet(
      "SELECT id FROM admissions WHERE id = ?",
      [req.params.id]
    );

    if (!admission) {
      return res.status(404).json({ error: "Admission request not found" });
    }

    await dbRun("DELETE FROM admissions WHERE id = ?", [req.params.id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete admission" });
  }
};
