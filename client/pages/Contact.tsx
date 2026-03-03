import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      id: 1,
      icon: Phone,
      title: "Phone",
      details: ["+880 1234 567890", "+880 9876 543210"],
      description: "Call us for immediate assistance",
    },
    {
      id: 2,
      icon: Mail,
      title: "Email",
      details: ["info@biologycare.com", "admissions@biologycare.com"],
      description: "Email us anytime, we'll respond within 24 hours",
    },
    {
      id: 3,
      icon: MapPin,
      title: "Address",
      details: ["123 Science Street", "Education Park, City - 123456"],
      description: "Visit us in person",
    },
    {
      id: 4,
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9:00 AM - 8:00 PM", "Sat: 10:00 AM - 6:00 PM"],
      description: "Sunday: Closed",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-green-600 to-primary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions? We're here to help and answer any question you might have
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 bg-gradient-to-b from-white to-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={info.id}
                    className="border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg text-center"
                  >
                    <CardContent className="pt-8">
                      <div className="inline-flex h-14 w-14 bg-primary/10 rounded-lg items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {info.title}
                      </h3>
                      <div className="space-y-2 mb-3">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="font-semibold text-primary">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-foreground/70">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Send us a Message
                </h2>

                <Card className="border-primary/30">
                  <CardContent className="pt-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="inline-flex h-16 w-16 bg-green-100 rounded-full items-center justify-center mb-4">
                          <svg
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-foreground/70">
                          Thank you for contacting us. We'll get back to you soon!
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-foreground">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Doe"
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
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="border-primary/20 focus:border-primary"
                            />
                          </div>
                        </div>

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
                            className="border-primary/20 focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-foreground">
                            Subject
                          </Label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary bg-white"
                          >
                            <option value="">Select a subject</option>
                            <option value="admission">Admission Inquiry</option>
                            <option value="course">Course Information</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-foreground">
                            Message
                          </Label>
                          <textarea
                            id="message"
                            name="message"
                            placeholder="Tell us how we can help you..."
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Information Section */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Why Contact Us?
                </h2>

                <div className="space-y-6">
                  <Card className="border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-bold text-foreground mb-3">
                        Admission Support
                      </h4>
                      <p className="text-foreground/70">
                        Have questions about our courses? Want to know more about
                        admission process? Our team is ready to guide you.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-bold text-foreground mb-3">
                        Course Details
                      </h4>
                      <p className="text-foreground/70">
                        Curious about curriculum, schedule, or fees? We'll provide
                        detailed information about all our programs.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-bold text-foreground mb-3">
                        Feedback & Suggestions
                      </h4>
                      <p className="text-foreground/70">
                        We value your feedback and continuously improve our services
                        based on student and parent suggestions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-bold text-foreground mb-3">
                        Technical Support
                      </h4>
                      <p className="text-foreground/70">
                        Facing issues with our online platform? Contact us and we'll
                        resolve it quickly.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ Preview */}
                <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-bold text-foreground mb-4">
                    Quick Response Times
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Phone calls: Usually answered within 5 minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Emails: Response within 24 hours
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Contact form: Reply within 12 hours
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-green-600/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Visit Our Location
            </h2>
            <div className="rounded-lg overflow-hidden shadow-lg border border-primary/20">
              <div className="bg-primary/10 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-foreground/70">
                    Map integration coming soon
                  </p>
                  <p className="text-foreground/60 mt-2">
                    123 Science Street, Education Park
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
