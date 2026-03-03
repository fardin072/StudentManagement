import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Plus, Trash2, Edit2, Loader, AlertCircle } from "lucide-react";
import { Student } from "@shared/api";

export default function AdminStudents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const batchMap: { [key: number]: string } = {
    1: "HSC Biology (XI-XII)",
    2: "Medical Entrance Prep",
    3: "SSC Biology (IX-X)",
    4: "Competitive Exam Coaching",
  };

  const batches = ["all", "1", "2", "3", "4"];

  // Fetch students from API
  useEffect(() => {
    fetchStudents();
  }, [selectedBatch]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const query = selectedBatch !== "all" ? `?batch=${selectedBatch}` : "";
      const response = await fetch(`/api/students${query}`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data.students || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`;
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.enrollmentId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

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
            <h1 className="text-4xl font-bold text-foreground">Student Management</h1>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
                  <Input
                    placeholder="Search by name, email, or enrollment ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-primary/20"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary bg-white"
                >
                  <option value="all">All Batches</option>
                  {batches.slice(1).map((batch) => (
                    <option key={batch} value={batch}>
                      {batchMap[parseInt(batch)]}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}

          {/* Students Table */}
          {!loading && (
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-primary/20">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Enrollment ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Batch
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-primary/10 hover:bg-primary/5 cursor-pointer"
                          onClick={() => navigate(`/admin/students/${student.id}`)}
                        >
                          <td className="py-3 px-4 text-foreground font-semibold">
                            {student.firstName} {student.lastName}
                          </td>
                          <td className="py-3 px-4 text-foreground/70">
                            {student.email}
                          </td>
                          <td className="py-3 px-4 text-foreground/70">
                            {student.enrollmentId}
                          </td>
                          <td className="py-3 px-4 text-foreground/70">
                            {batchMap[student.batchId]}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                student.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {student.status.charAt(0).toUpperCase() +
                                student.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:bg-primary/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:bg-red-100"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredStudents.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-foreground/70">No students found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/70 mb-2">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">{students.length}</p>
                </CardContent>
              </Card>
              <Card className="border-green-600/20 bg-green-50">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/70 mb-2">Active</p>
                  <p className="text-3xl font-bold text-green-600">
                    {students.filter((s) => s.status === "active").length}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-orange-600/20 bg-orange-50">
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/70 mb-2">Inactive</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {students.filter((s) => s.status === "inactive").length}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
