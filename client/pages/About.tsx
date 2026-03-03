import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Award, Users, BookOpen, Star, Zap } from "lucide-react";

export default function About() {
  const credentials = [
    {
      id: 1,
      title: "MSc Biology",
      subtitle: "Specialized in Cell Biology",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "PhD Biochemistry",
      subtitle: "Advanced Research & Teaching",
      icon: Zap,
    },
    {
      id: 3,
      title: "15+ Years Experience",
      subtitle: "Teaching & Mentoring",
      icon: Award,
    },
    {
      id: 4,
      title: "Published Researcher",
      subtitle: "20+ Papers in Peer-Reviewed Journals",
      icon: Star,
    },
  ];

  const achievements = [
    {
      id: 1,
      number: "500+",
      label: "Students Taught",
      description:
        "Successfully guided over 500 students through their biology education journey",
    },
    {
      id: 2,
      number: "98%",
      label: "Success Rate",
      description: "98% of students achieve their target scores in competitive exams",
    },
    {
      id: 3,
      number: "20+",
      label: "Published Papers",
      description: "Contributed to scientific knowledge through peer-reviewed research",
    },
    {
      id: 4,
      number: "5",
      label: "National Awards",
      description: "Recognized for excellence in education and mentorship",
    },
  ];

  const philosophy = [
    {
      id: 1,
      title: "Student-Centric Learning",
      description:
        "Every student is unique. We customize teaching methods to match individual learning styles and pace.",
    },
    {
      id: 2,
      title: "Practical Application",
      description:
        "Biology comes alive through experiments and real-world examples, not just memorization.",
    },
    {
      id: 3,
      title: "Concept Clarity",
      description:
        "We focus on understanding concepts deeply rather than cramming facts. Strong fundamentals are the foundation.",
    },
    {
      id: 4,
      title: "Continuous Growth",
      description:
        "We provide regular assessments, feedback, and performance tracking to help students improve constantly.",
    },
    {
      id: 5,
      title: "Interactive Sessions",
      description:
        "Small batch sizes ensure every student gets attention and can ask questions freely.",
    },
    {
      id: 6,
      title: "Comprehensive Support",
      description:
        "Beyond classes, we provide study materials, practice tests, and guidance for competitive exams.",
    },
  ];

  const facilities = [
    "Advanced Biology Laboratory",
    "Microscopes & Specimen Collection",
    "Digital Learning Resources",
    "Interactive Whiteboards",
    "Reference Library",
    "Online Study Platform",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-green-600 to-primary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Biology Care</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your trusted partner in mastering biology education with excellence
              and dedication
            </p>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Meet Prof. Dr. Rahman Ahmed
                </h2>
                <div className="space-y-4 text-foreground/70 leading-relaxed">
                  <p>
                    Prof. Dr. Rahman Ahmed is the founder and lead instructor of
                    Biology Care. With over 15 years of experience in teaching
                    biology at national and international levels, he has become a
                    trusted mentor for thousands of students.
                  </p>
                  <p>
                    His passion for teaching stems from a deep love for biology and
                    a commitment to making the subject accessible and enjoyable for
                    every student. He believes that understanding biology is not
                    about memorizing facts, but about grasping the fundamental
                    principles that govern life itself.
                  </p>
                  <p>
                    Prof. Ahmed has been recognized with multiple national awards
                    for his contributions to education. He has also served as a
                    curriculum developer for the State Education Board and has
                    presented his research at international conferences.
                  </p>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-6">
                  {credentials.map((cred) => {
                    const Icon = cred.icon;
                    return (
                      <Card
                        key={cred.id}
                        className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg"
                      >
                        <CardContent className="pt-6 text-center">
                          <div className="inline-flex h-12 w-12 bg-primary/10 rounded-lg items-center justify-center mb-3">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="font-bold text-foreground mb-1">
                            {cred.title}
                          </h4>
                          <p className="text-sm text-foreground/70">
                            {cred.subtitle}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-green-600/5 to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-foreground mb-16">
              Our Track Record
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg text-center"
                >
                  <CardContent className="pt-8">
                    <p className="text-4xl font-bold text-primary mb-2">
                      {achievement.number}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {achievement.label}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-foreground mb-4">
              Our Teaching Philosophy
            </h2>
            <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-16">
              We believe in a holistic approach to biology education that combines
              rigorous academics with practical understanding
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {philosophy.map((item) => (
                <Card
                  key={item.id}
                  className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg"
                >
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-green-600/5 to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-foreground mb-4">
              Our Facilities
            </h2>
            <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-16">
              We provide a world-class learning environment equipped with modern
              resources
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <Card key={index} className="border-primary/20">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-semibold text-foreground">{facility}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
