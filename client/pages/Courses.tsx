import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Award,
} from "lucide-react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      name: "HSC Biology (Class XI-XII)",
      level: "Advanced",
      duration: "1 Year",
      schedule: "Saturday & Wednesday: 5:00 PM - 7:00 PM",
      batchSize: "Max 15 students",
      fee: "৳15,000/month",
      description:
        "Complete HSC biology curriculum with focus on both theory and practicals. Covers zoology, botany, and human physiology.",
      highlights: [
        "Complete HSC curriculum coverage",
        "Weekly practice tests",
        "Lab experiments and demonstrations",
        "Doubt clearing sessions",
        "Study materials provided",
        "Competitive exam preparation",
      ],
      topics: [
        "Cell Biology & Genetics",
        "Human Physiology",
        "Plant Physiology",
        "Ecology & Evolution",
        "Biotechnology",
        "Biochemistry",
      ],
    },
    {
      id: 2,
      name: "SSC Biology (Class IX-X)",
      level: "Intermediate",
      duration: "1 Year",
      schedule: "Tuesday & Friday: 5:00 PM - 7:00 PM",
      batchSize: "Max 15 students",
      fee: "৳10,000/month",
      description:
        "Comprehensive SSC biology program covering fundamentals. Build strong foundation for higher studies.",
      highlights: [
        "Foundation building for biology",
        "Concept-based teaching",
        "Interactive experiments",
        "Regular assessments",
        "Personalized feedback",
        "Exam-focused preparation",
      ],
      topics: [
        "Cell Structure & Function",
        "Plant & Animal Tissues",
        "Nutrition & Digestion",
        "Respiration & Circulation",
        "Reproduction & Growth",
        "Classification of Life",
      ],
    },
    {
      id: 3,
      name: "Medical Entrance Preparation",
      level: "Professional",
      duration: "2-3 Years",
      schedule: "Daily Classes: 6:00 PM - 8:00 PM",
      batchSize: "Max 20 students",
      fee: "৳20,000/month",
      description:
        "Intensive preparation for NEET and other medical entrance exams. Covers advanced concepts and problem-solving.",
      highlights: [
        "NEET-specific curriculum",
        "Advanced problem solving",
        "Mock tests every week",
        "One-on-one guidance",
        "Previous year papers",
        "Rank improvement tracking",
      ],
      topics: [
        "Molecular Biology",
        "Human Anatomy",
        "Physiology",
        "Ecology & Environment",
        "Genetics",
        "Botany & Zoology Advanced",
      ],
    },
    {
      id: 4,
      name: "Competitive Exam Coaching",
      level: "Advanced",
      duration: "6 Months",
      schedule: "Weekend Batches: Saturday & Sunday 10:00 AM - 12:00 PM",
      batchSize: "Max 25 students",
      fee: "৳8,000/month",
      description:
        "Specialized coaching for various competitive exams like civil service, state exams, and university entrance tests.",
      highlights: [
        "Exam-specific strategies",
        "Time management training",
        "Current affairs coverage",
        "Discussion forums",
        "Question banks",
        "Success tracking",
      ],
      topics: [
        "General Science",
        "Environmental Science",
        "Biology fundamentals",
        "Current research topics",
        "Case studies",
        "Practical applications",
      ],
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-green-600 to-primary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Courses</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tailored biology education programs for every level and goal
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl flex flex-col"
                >
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-green-600/5 border-b border-primary/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <CardTitle className="text-2xl text-foreground">
                          {course.name}
                        </CardTitle>
                        <p className="text-sm text-primary font-semibold mt-2">
                          {course.level} Level
                        </p>
                      </div>
                      <div className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-lg">
                        {course.fee}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 flex-1 flex flex-col">
                    <p className="text-foreground/70 mb-6">{course.description}</p>

                    {/* Course Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            Duration
                          </p>
                          <p className="text-foreground/70 text-sm">
                            {course.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            Schedule
                          </p>
                          <p className="text-foreground/70 text-sm">
                            {course.schedule}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            Batch Size
                          </p>
                          <p className="text-foreground/70 text-sm">
                            {course.batchSize}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        What's Included:
                      </h4>
                      <ul className="space-y-2">
                        {course.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-foreground/70 text-sm">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Topics */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Topics Covered:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Enroll Button */}
                    <div className="mt-auto">
                      <Link to="/admission" className="block w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6">
                          Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-green-600/5 to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-foreground mb-16">
              Why Choose Our Courses?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: "Expert Faculty",
                  description: "Learn from experienced educators with proven track records",
                },
                {
                  icon: Users,
                  title: "Small Batches",
                  description: "Limited students ensure personalized attention and guidance",
                },
                {
                  icon: BookOpen,
                  title: "Comprehensive Materials",
                  description: "Complete study materials, notes, and practice problems",
                },
                {
                  icon: CheckCircle,
                  title: "Proven Results",
                  description: "98% success rate in competitive and board exams",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card key={idx} className="border-primary/20 text-center">
                    <CardContent className="pt-8">
                      <div className="inline-flex h-14 w-14 bg-primary/10 rounded-lg items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Master Biology?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Join thousands of successful students and transform your biology learning experience
            </p>
            <Link to="/admission">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6">
                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
