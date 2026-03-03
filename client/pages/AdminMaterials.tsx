import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  X,
  Download,
  Trash2,
  FileText,
  Archive,
  File,
} from "lucide-react";

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

interface Batch {
  id: number;
  name: string;
  program: string;
  fee: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
}

export default function AdminMaterials() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [filterBatch, setFilterBatch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    batchId: "",
    courseId: "",
    file: null as File | null,
  });

  useEffect(() => {
    fetchMaterials();
    fetchBatches();
    fetchCourses();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch("/api/materials");
      const data = await response.json();
      setMaterials(Array.isArray(data) ? data : data.materials || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setMaterials([]);
    }
  };

  const fetchBatches = async () => {
    try {
      const response = await fetch("/api/batches");
      const data = await response.json();
      setBatches(Array.isArray(data) ? data : data.batches || []);
    } catch (error) {
      console.error("Error fetching batches:", error);
      setBatches([]);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  const getFileType = (fileName: string): string => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return "PDF";
      case "zip":
        return "ZIP";
      case "doc":
      case "docx":
        return "Word";
      case "xls":
      case "xlsx":
        return "Excel";
      case "ppt":
      case "pptx":
        return "PowerPoint";
      default:
        return "File";
    }
  };

  const getFileSize = (file: File): string => {
    const bytes = file.size;
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.file || (!formData.batchId && !formData.courseId)) {
      alert("Please fill in all required fields and select at least one batch or course");
      return;
    }

    setLoading(true);

    try {
      const file = formData.file;
      const fileSize = getFileSize(file);
      const fileType = getFileType(file.name);

      // Create material record (in production, this would handle actual file upload)
      const materialData = {
        title: formData.title,
        description: formData.description,
        batchId: formData.batchId ? parseInt(formData.batchId) : null,
        courseId: formData.courseId || null,
        fileType,
        fileName: file.name,
        fileSize,
        uploadedBy: "Admin",
      };

      const response = await fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialData),
      });

      if (response.ok) {
        alert("Material uploaded successfully!");
        setFormData({
          title: "",
          description: "",
          batchId: "",
          courseId: "",
          file: null,
        });
        setShowUploadForm(false);
        fetchMaterials();
      } else {
        alert("Failed to upload material");
      }
    } catch (error) {
      console.error("Error uploading material:", error);
      alert("Error uploading material");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this material?")) {
      try {
        const response = await fetch(`/api/materials/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Material deleted successfully");
          fetchMaterials();
        } else {
          alert("Failed to delete material");
        }
      } catch (error) {
        console.error("Error deleting material:", error);
      }
    }
  };

  const filteredMaterials = materials.filter((material) => {
    const batchMatch = !filterBatch || material.batchId?.toString() === filterBatch;
    const courseMatch = !filterCourse || material.courseId === filterCourse;
    return batchMatch && courseMatch;
  });

  const getBatchName = (batchId?: number) => {
    return batches.find((b) => b.id === batchId)?.name || "All Batches";
  };

  const getCourseName = (courseId?: string) => {
    return courses.find((c) => c.id === courseId)?.name || "All Courses";
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "zip":
        return <Archive className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-red-600" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/panel">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Panel
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Study Materials</h1>
          </div>
          <Button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-primary hover:bg-primary/90"
          >
            <Upload className="h-4 w-4 mr-2" />
            {showUploadForm ? "Cancel" : "Upload Material"}
          </Button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <Card className="mb-8 border-primary/30 shadow-lg">
            <CardHeader>
              <CardTitle>Upload New Study Material</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-foreground font-semibold">
                      Material Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Cell Biology Notes"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file" className="text-foreground font-semibold">
                      Select File *
                    </Label>
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      className="border-primary/20 focus:border-primary"
                    />
                    {formData.file && (
                      <p className="text-sm text-foreground/70">
                        Selected: {formData.file.name} ({getFileSize(formData.file)})
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Description (Optional)
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe the content of this material..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="batchId" className="text-foreground">
                      Batch (Optional)
                    </Label>
                    <select
                      id="batchId"
                      name="batchId"
                      value={formData.batchId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary bg-white"
                    >
                      <option value="">Select a batch...</option>
                      {batches.map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="courseId" className="text-foreground">
                      Course (Optional)
                    </Label>
                    <select
                      id="courseId"
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary bg-white"
                    >
                      <option value="">Select a course...</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold flex-1"
                  >
                    {loading ? "Uploading..." : "Upload Material"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowUploadForm(false);
                      setFormData({
                        title: "",
                        description: "",
                        batchId: "",
                        courseId: "",
                        file: null,
                      });
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="flex-1 min-w-48">
            <Label htmlFor="filterBatch" className="text-sm">
              Filter by Batch
            </Label>
            <select
              id="filterBatch"
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary bg-white text-sm mt-1"
            >
              <option value="">All Batches</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-48">
            <Label htmlFor="filterCourse" className="text-sm">
              Filter by Course
            </Label>
            <select
              id="filterCourse"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary bg-white text-sm mt-1"
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Materials List */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Materials ({filteredMaterials.length})
          </h2>

          {filteredMaterials.length === 0 ? (
            <Card className="border-primary/20">
              <CardContent className="pt-8 text-center">
                <File className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/70">
                  No study materials found. Upload one to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        {getFileIcon(material.fileType)}
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">
                            {material.title}
                          </h3>
                          <p className="text-xs text-foreground/60 mt-1">
                            {material.fileType}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(material.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {material.description && (
                      <p className="text-sm text-foreground/70 mb-4">
                        {material.description}
                      </p>
                    )}

                    <div className="space-y-2 mb-4 text-xs text-foreground/60">
                      {material.batchId && (
                        <p>
                          <span className="font-semibold">Batch:</span>{" "}
                          {getBatchName(material.batchId)}
                        </p>
                      )}
                      {material.courseId && (
                        <p>
                          <span className="font-semibold">Course:</span>{" "}
                          {getCourseName(material.courseId)}
                        </p>
                      )}
                      <p>
                        <span className="font-semibold">Size:</span> {material.fileSize}
                      </p>
                      <p>
                        <span className="font-semibold">Uploaded:</span>{" "}
                        {new Date(material.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white text-sm"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
