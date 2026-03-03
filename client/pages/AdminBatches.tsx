import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Users, Clock, DollarSign, Edit2, Trash2, X } from "lucide-react";

interface Batch {
  id: number;
  name: string;
  instructor: string;
  students: number;
  fee: string;
  schedule: string;
  startDate: string;
  status: "active" | "inactive";
}

export default function AdminBatches() {
  const navigate = useNavigate();
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: 1,
      name: "HSC Biology (XI-XII)",
      instructor: "Prof. Dr. Rahman Ahmed",
      students: 45,
      fee: "₹15,000/month",
      schedule: "Sat & Wed, 5-7 PM",
      startDate: "Jan 10, 2025",
      status: "active",
    },
    {
      id: 2,
      name: "Medical Entrance Prep",
      instructor: "Prof. Dr. Rahman Ahmed",
      students: 38,
      fee: "₹20,000/month",
      schedule: "Daily, 6-8 PM",
      startDate: "Jan 15, 2025",
      status: "active",
    },
    {
      id: 3,
      name: "SSC Biology (IX-X)",
      instructor: "Prof. Dr. Rahman Ahmed",
      students: 42,
      fee: "₹10,000/month",
      schedule: "Tue & Fri, 5-7 PM",
      startDate: "Jan 20, 2025",
      status: "active",
    },
    {
      id: 4,
      name: "Competitive Exam Coaching",
      instructor: "Prof. Dr. Rahman Ahmed",
      students: 28,
      fee: "₹8,000/month",
      schedule: "Sat & Sun, 10-12 AM",
      startDate: "Feb 01, 2025",
      status: "active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    students: 0,
    fee: "",
    schedule: "",
    startDate: "",
  });

  const handleOpenModal = (batch?: Batch) => {
    if (batch) {
      setEditingId(batch.id);
      setFormData({
        name: batch.name,
        instructor: batch.instructor,
        students: batch.students,
        fee: batch.fee,
        schedule: batch.schedule,
        startDate: batch.startDate,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        instructor: "",
        students: 0,
        fee: "",
        schedule: "",
        startDate: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "students" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSave = () => {
    if (editingId) {
      // Edit existing batch
      setBatches((prev) =>
        prev.map((batch) =>
          batch.id === editingId ? { ...batch, ...formData } : batch
        )
      );
    } else {
      // Create new batch
      const newBatch: Batch = {
        id: Math.max(...batches.map((b) => b.id), 0) + 1,
        ...formData,
        status: "active",
      };
      setBatches((prev) => [...prev, newBatch]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      setBatches((prev) => prev.filter((batch) => batch.id !== id));
    }
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
            <h1 className="text-4xl font-bold text-foreground">Batch Management</h1>
            <Button
              onClick={() => handleOpenModal()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Batch
            </Button>
          </div>

          {/* Batches Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {batches.map((batch) => (
              <Card
                key={batch.id}
                className="border-primary/20 bg-white hover:shadow-lg cursor-pointer transition-shadow"
                onClick={() => navigate(`/admin/batches/${batch.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{batch.name}</CardTitle>
                      <p className="text-sm text-foreground/70 mt-1">
                        {batch.instructor}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-foreground/60">Students</p>
                        <p className="font-bold text-foreground">{batch.students}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-foreground/60">Fee</p>
                        <p className="font-bold text-foreground">{batch.fee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-foreground/60">Schedule</p>
                        <p className="font-bold text-foreground text-sm">
                          {batch.schedule}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-primary/10">
                    <p className="text-xs text-foreground/60 mb-3">
                      Started: {batch.startDate}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(batch);
                        }}
                        variant="outline"
                        className="flex-1 border-primary/20 text-foreground"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(batch.id);
                        }}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Total Batches</p>
                <p className="text-3xl font-bold text-foreground">{batches.length}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Total Enrollment</p>
                <p className="text-3xl font-bold text-primary">
                  {batches.reduce((sum, b) => sum + b.students, 0)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create/Edit Batch Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="border-primary/20 bg-white max-w-2xl w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {editingId ? "Edit Batch" : "Create New Batch"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseModal}
                  className="text-foreground/70 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Batch Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., HSC Biology (XI-XII)"
                  className="border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  placeholder="Instructor name"
                  className="border-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="students">Number of Students</Label>
                  <Input
                    id="students"
                    name="students"
                    type="number"
                    value={formData.students}
                    onChange={handleInputChange}
                    className="border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">Monthly Fee</Label>
                  <Input
                    id="fee"
                    name="fee"
                    value={formData.fee}
                    onChange={handleInputChange}
                    placeholder="e.g., ₹15,000/month"
                    className="border-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="e.g., Sat & Wed, 5-7 PM"
                  className="border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  placeholder="e.g., Jan 10, 2025"
                  className="border-primary/20"
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-primary/20">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  {editingId ? "Update Batch" : "Create Batch"}
                </Button>
                <Button
                  onClick={handleCloseModal}
                  variant="outline"
                  className="flex-1 border-primary/20 text-foreground"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Layout>
  );
}
