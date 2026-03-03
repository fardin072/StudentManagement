import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  Loader,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AdmissionRequest } from "@shared/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState<AdmissionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Fetch admissions on component mount
  useEffect(() => {
    fetchAdmissions();
  }, [statusFilter]);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setError("");
      const query = statusFilter !== "all" ? `?status=${statusFilter}` : "";
      const response = await fetch(`/api/admissions${query}`);
      if (!response.ok) throw new Error("Failed to fetch admissions");
      const data = await response.json();
      setAdmissions(data.admissions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch admissions");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setIsProcessing(true);

      // First, approve the admission
      const approveResponse = await fetch(`/api/admissions/${id}/approve`, {
        method: "POST",
      });
      if (!approveResponse.ok)
        throw new Error("Failed to approve admission");

      // Get the approved admission details
      const admissionData = await approveResponse.json();
      const admission = admissionData.admission;

      // Create a student record from the approved admission
      const studentResponse = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: admission.firstName,
          lastName: admission.lastName,
          email: admission.email,
          phone: admission.phone,
          dateOfBirth: admission.dateOfBirth,
          fatherName: admission.fatherName,
          address: admission.address,
          batchId: admission.batchId,
          program: admission.program,
          admissionId: admission.id,
        }),
      });

      if (!studentResponse.ok) {
        throw new Error("Failed to create student record");
      }

      await fetchAdmissions();
      setShowApproveDialog(false);
      setSelectedAdmission(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve admission");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setIsProcessing(true);
      const response = await fetch(`/api/admissions/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason || "Not specified" }),
      });
      if (!response.ok) throw new Error("Failed to reject admission");
      await fetchAdmissions();
      setShowRejectDialog(false);
      setRejectReason("");
      setSelectedAdmission(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject admission");
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const batches: { [key: number]: string } = {
    1: "HSC Biology (XI-XII)",
    2: "Medical Entrance Prep",
    3: "SSC Biology (IX-X)",
    4: "Competitive Exam Coaching",
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/admin/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">Admission Requests</h1>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Status Filter */}
          <div className="flex gap-3 mb-8">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <Button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={
                  statusFilter === status
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white border border-primary/20 text-foreground hover:bg-primary/5"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === "pending" && admissions.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {admissions.length}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}

          {/* Empty state */}
          {!loading && admissions.length === 0 && (
            <Card className="border-primary/20 bg-white text-center py-12">
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  No {statusFilter === "all" ? "" : statusFilter} admission requests
                </p>
              </CardContent>
            </Card>
          )}

          {/* Admissions List */}
          {!loading && admissions.length > 0 && (
            <div className="space-y-4">
              {admissions.map((admission) => (
                <Card
                  key={admission.id}
                  className="border-primary/20 bg-white hover:shadow-md transition-shadow"
                >
                  <CardHeader
                    className="pb-3 cursor-pointer hover:bg-primary/5"
                    onClick={() =>
                      setExpandedId(expandedId === admission.id ? null : admission.id)
                    }
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {admission.firstName} {admission.lastName}
                        </CardTitle>
                        <p className="text-sm text-foreground/70 mt-1">
                          {batches[admission.batchId] || "Unknown Batch"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadgeColor(
                            admission.status
                          )}`}
                        >
                          {admission.status.charAt(0).toUpperCase() +
                            admission.status.slice(1)}
                        </span>
                        {expandedId === admission.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {expandedId === admission.id && (
                    <CardContent className="border-t border-primary/10 pt-4 space-y-4">
                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Email</p>
                          <p className="font-medium">{admission.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Phone</p>
                          <p className="font-medium">{admission.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Date of Birth</p>
                          <p className="font-medium">{admission.dateOfBirth}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Father's Name</p>
                          <p className="font-medium">{admission.fatherName}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-foreground/70 mb-1">Address</p>
                          <p className="font-medium">{admission.address}</p>
                        </div>
                      </div>

                      {/* Program Information */}
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-primary/10">
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Program</p>
                          <p className="font-medium">{admission.program}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/70 mb-1">Applied On</p>
                          <p className="font-medium">
                            {new Date(admission.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Rejection Reason (if rejected) */}
                      {admission.status === "rejected" &&
                        admission.rejectionReason && (
                          <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-200">
                            <p className="text-xs text-red-700 font-semibold mb-1">
                              Rejection Reason:
                            </p>
                            <p className="text-sm text-red-700">
                              {admission.rejectionReason}
                            </p>
                          </div>
                        )}

                      {/* Action Buttons */}
                      {admission.status === "pending" && (
                        <div className="pt-2 border-t border-primary/10 flex gap-2">
                          <Button
                            onClick={() => {
                              setSelectedAdmission(admission);
                              setShowApproveDialog(true);
                            }}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            disabled={isProcessing}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedAdmission(admission);
                              setShowRejectDialog(true);
                            }}
                            variant="outline"
                            className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                            disabled={isProcessing}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Approve Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Admission?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedAdmission && (
                <>
                  You are approving the admission for{" "}
                  <strong>
                    {selectedAdmission.firstName} {selectedAdmission.lastName}
                  </strong>
                  . They will be added to the student list and will receive a
                  confirmation email with login credentials.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              selectedAdmission && handleApprove(selectedAdmission.id)
            }
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? "Approving..." : "Approve"}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Admission</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-foreground/70">
              {selectedAdmission && (
                <>
                  Are you sure you want to reject the admission for{" "}
                  <strong>
                    {selectedAdmission.firstName} {selectedAdmission.lastName}
                  </strong>
                  ? Provide a reason for rejection.
                </>
              )}
            </p>
            <div>
              <Label htmlFor="reason" className="text-sm font-medium">
                Reason for Rejection (optional)
              </Label>
              <Textarea
                id="reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectReason("");
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedAdmission && handleReject(selectedAdmission.id)
              }
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? "Rejecting..." : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
