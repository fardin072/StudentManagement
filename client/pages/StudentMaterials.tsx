import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, File, Archive } from "lucide-react";

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

export default function StudentMaterials() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBatches();
    fetchMaterials();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await fetch("/api/batches");
      const data = await response.json();
      const batchList = Array.isArray(data) ? data : data.batches || [];
      setBatches(batchList);
      // Set first batch as default
      if (batchList.length > 0) {
        setSelectedBatchId(batchList[0].id);
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/materials");
      const data = await response.json();
      const materialsList = Array.isArray(data) ? data : data.materials || [];
      setMaterials(materialsList);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    return fileType === "ZIP" ? (
      <Archive className="h-6 w-6 text-blue-600" />
    ) : (
      <File className="h-6 w-6 text-red-600" />
    );
  };

  // Filter materials by selected batch
  const filteredMaterials = materials.filter(
    (material) => !selectedBatchId || material.batchId === selectedBatchId
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/student/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Study Materials</h1>

          {/* Batch Selector */}
          {batches.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {batches.map((batch) => (
                <Button
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.id)}
                  className={
                    selectedBatchId === batch.id
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white border border-primary/20 text-foreground hover:bg-primary/5"
                  }
                >
                  {batch.name}
                </Button>
              ))}
            </div>
          )}

          {/* Materials List */}
          {loading ? (
            <Card className="border-primary/20">
              <CardContent className="pt-8 text-center">
                <p className="text-foreground/70">Loading materials...</p>
              </CardContent>
            </Card>
          ) : filteredMaterials.length === 0 ? (
            <Card className="border-primary/20">
              <CardContent className="pt-8 text-center">
                <File className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/70">No study materials available for this batch yet.</p>
                <p className="text-sm text-foreground/60 mt-2">Check back soon for new materials!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="border-primary/20 bg-white hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getFileIcon(material.fileType)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-lg mb-1">
                            {material.title}
                          </h4>
                          {material.description && (
                            <p className="text-sm text-foreground/70 mb-2">{material.description}</p>
                          )}
                          <div className="flex flex-wrap gap-3 text-xs text-foreground/60">
                            <span className="bg-primary/5 px-2 py-1 rounded">
                              {material.fileType}
                            </span>
                            <span className="bg-primary/5 px-2 py-1 rounded">
                              {material.fileSize}
                            </span>
                            <span className="bg-primary/5 px-2 py-1 rounded">
                              Added: {new Date(material.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-white flex-shrink-0">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Info Card */}
          <Card className="mt-12 border-blue-600/20 bg-blue-50">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Tip:</strong> Download and study these materials regularly for better
                exam preparation.
              </p>
              <p className="text-sm text-blue-800">
                If you face any issues downloading materials, contact your instructor or support
                team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
