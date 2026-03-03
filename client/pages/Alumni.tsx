import { useState } from "react";
import Layout from "@/components/Layout";
import AlumniCard from "@/components/AlumniCard";
import { alumniData } from "@/data/alumni";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const fields = ["All", "Medicine", "Engineering", "Pharmacy", "Research", "Dentistry", "Public Health"];

export default function Alumni() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("All");

  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesField = selectedField === "All" || alumni.field === selectedField;

    return matchesSearch && matchesField;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-green-600 to-primary py-20 md:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Our Distinguished Alumni
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Meet the remarkable graduates who have gone on to achieve excellence
              in their respective fields. Our alumni are the pride of Biology Care,
              excelling in medicine, engineering, research, and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">{alumniData.length}+</p>
              <p className="text-foreground/70 mt-2">Alumni Network</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">8</p>
              <p className="text-foreground/70 mt-2">Different Fields</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">2013-2019</p>
              <p className="text-foreground/70 mt-2">Graduation Span</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="text-foreground/70 mt-2">Career Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 via-green-600/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <Input
                placeholder="Search by name, organization, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">
              Filter by Field
            </p>
            <div className="flex flex-wrap gap-2">
              {fields.map((field) => (
                <Button
                  key={field}
                  variant={selectedField === field ? "default" : "outline"}
                  onClick={() => setSelectedField(field)}
                  className={selectedField === field ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {field}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-lg font-semibold text-foreground">
              Showing {filteredAlumni.length} alumni
            </p>
          </div>

          {filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAlumni.map((alumni) => (
                <AlumniCard
                  key={alumni.id}
                  alumni={alumni}
                  featured={alumni.highlight}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-foreground/70">
                No alumni found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-green-600 to-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Become Part of Our Success Story
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who have achieved their dreams through Biology Care.
            Your journey to excellence starts here.
          </p>
          <a href="/admission">
            <button className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
              🎓 Start Your Journey Today
            </button>
          </a>
        </div>
      </section>
    </Layout>
  );
}
