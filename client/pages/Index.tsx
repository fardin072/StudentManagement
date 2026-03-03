import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Beaker,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  MessageCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import AlumniCard from "@/components/AlumniCard";
import { alumniData } from "@/data/alumni";

const courseBatches = [
  {
    id: 1,
    name: "HSC Biology",
    class: "Class XI-XII",
    duration: "1 Year",
    schedule: "Saturday & Wednesday",
    icon: BookOpen,
  },
  {
    id: 2,
    name: "SSC Biology",
    class: "Class IX-X",
    duration: "1 Year",
    schedule: "Tuesday & Friday",
    icon: BookOpen,
  },
  {
    id: 3,
    name: "Medical Entrance",
    class: "All Classes",
    duration: "2-3 Years",
    schedule: "Daily Sessions",
    icon: Beaker,
  },
  {
    id: 4,
    name: "Competitive Exams",
    class: "Class XII+",
    duration: "6 Months",
    schedule: "Weekend Batches",
    icon: Award,
  },
];

const achievements = [
  {
    id: 1,
    title: "500+ Students Passed",
    subtitle: "in last 5 years",
    icon: Users,
  },
  {
    id: 2,
    title: "98% Success Rate",
    subtitle: "in competitive exams",
    icon: Award,
  },
  {
    id: 3,
    title: "15+ Years Experience",
    subtitle: "in Biology education",
    icon: Star,
  },
  {
    id: 4,
    title: "Expert Faculty",
    subtitle: "from top institutions",
    icon: Beaker,
  },
];

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", class: "", message: "" });
    alert("Thank you for your admission inquiry! We will contact you soon.");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-green-600 to-primary py-20 md:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 inline-block bg-white/20 px-4 py-2 rounded-full">
                <span className="text-sm font-semibold">Excellence in Science</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Master Biology with Expert Guidance
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join Biology Care, where we transform students into confident
                biology experts. Learn from experienced educators with proven
                track record of success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admission">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all w-full sm:w-auto"
                  >
                    🎓 Admit Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all w-full sm:w-auto"
                  >
                    📚 View Courses
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <div className="relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-white/50 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-full p-12 border border-white/20">
                  <img
                    src="/tt.png"
                    alt="Advanced Biology Curriculum"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                About Our Instructor
              </h2>
              <div className="bg-gradient-to-r from-primary/10 to-green-600/10 rounded-lg p-8 border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Prof. Dr. Rahman Ahmed
                </h3>
                <p className="text-accent mb-4 font-semibold">
                  MSc Biology, PhD in Biochemistry
                </p>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  With over 15 years of experience in teaching biology at
                  national and international levels, Prof. Ahmed has guided
                  thousands of students to achieve their dreams. His unique
                  teaching methodology combines theoretical concepts with
                  practical applications.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  He is a published researcher with 20+ papers in peer-reviewed
                  journals and has trained biology teachers across the country.
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Featured in National Education Awards 2023
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Curriculum Developer for State Education Board
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    International Conference Speaker
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Teaching Philosophy
                  </h4>
                  <p className="text-foreground/70">
                    We believe biology is not just memorization—it's
                    understanding life itself. Our interactive sessions combine
                    lectures, experiments, and real-world applications.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <Beaker className="h-5 w-5" />
                    Lab Facilities
                  </h4>
                  <p className="text-foreground/70">
                    State-of-the-art biology laboratory with modern equipment,
                    microscopes, and specimens for hands-on learning experience.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Small Batches
                  </h4>
                  <p className="text-foreground/70">
                    Maximum 15 students per batch to ensure personalized
                    attention and better learning outcomes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/5 via-green-600/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Proven results that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={achievement.id}
                  className="text-center border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg"
                >
                  <CardContent className="pt-8">
                    <div className="inline-flex h-16 w-16 bg-primary/10 rounded-full items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-foreground/70">{achievement.subtitle}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Alumni Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Success Stories of Our Alumni
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Meet our most distinguished graduates who have achieved remarkable
              success in their careers. These alumni are shining examples of what
              dedication and quality education can accomplish.
            </p>
            <Link to="/alumni">
              <Button
                className="bg-primary hover:bg-primary/90"
                size="lg"
              >
                View All Alumni <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumniData
              .filter((alumni) => alumni.highlight)
              .map((alumni) => (
                <AlumniCard
                  key={alumni.id}
                  alumni={alumni}
                  featured={true}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Courses & Batches
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Choose the course that fits your education goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseBatches.map((course) => {
              const Icon = course.icon;
              return (
                <Card
                  key={course.id}
                  className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:-translate-y-2"
                >
                  <CardContent className="pt-6">
                    <div className="inline-flex h-12 w-12 bg-primary/10 rounded-lg items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {course.name}
                    </h3>
                    <p className="text-sm text-primary font-semibold mb-4">
                      {course.class}
                    </p>
                    <div className="space-y-2 text-sm text-foreground/70 mb-6">
                      <p>
                        <span className="font-semibold">Duration:</span>{" "}
                        {course.duration}
                      </p>
                      <p>
                        <span className="font-semibold">Schedule:</span>{" "}
                        {course.schedule}
                      </p>
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Admission Form Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/5 via-green-600/5 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Online Admission Form
            </h2>
            <p className="text-xl text-foreground/70">
              Take the first step towards mastering biology
            </p>
          </div>

          <Card className="border-primary/30 shadow-lg">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+880 1234 567890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class" className="text-foreground">
                      Select Course
                    </Label>
                    <select
                      id="class"
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary bg-white"
                    >
                      <option value="">Choose a course</option>
                      {courseBatches.map((course) => (
                        <option key={course.id} value={course.name}>
                          {course.name} ({course.class})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message (Optional)
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your biology learning goals..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  Submit Admission Form
                </Button>

                <p className="text-center text-sm text-foreground/70">
                  We'll contact you within 24 hours to confirm your admission.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-foreground/70">
              Have questions? We're here to help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex h-16 w-16 bg-primary/10 rounded-full items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Phone</h3>
                <p className="text-foreground/70 mb-2">+880 1234 567890</p>
                <p className="text-sm text-foreground/60">
                  Mon-Sat: 9:00 AM - 8:00 PM
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex h-16 w-16 bg-primary/10 rounded-full items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                <p className="text-foreground/70 mb-2">info@biologycare.com</p>
                <p className="text-sm text-foreground/60">
                  Response within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex h-16 w-16 bg-primary/10 rounded-full items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Location
                </h3>
                <p className="text-foreground/70 mb-2">
                  123 Science Street, Education Park
                </p>
                <p className="text-sm text-foreground/60">
                  Close to major institutes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a
          href="https://wa.me/8801234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 animate-vibrate"
        >
          <MessageCircle className="h-8 w-8" />
        </a>
      </div>
    </Layout>
  );
}
