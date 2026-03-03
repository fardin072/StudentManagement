import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, AlertCircle, Loader } from "lucide-react";
import { CreateAdmissionRequest } from "@shared/api";

// Mock batches - in production, these would come from API
const batches = [
  { id: 1, name: "HSC Biology (XI-XII)", program: "Advanced", fee: "৳15,000/month" },
  { id: 2, name: "Medical Entrance Prep", program: "Professional", fee: "৳20,000/month" },
  { id: 3, name: "SSC Biology (IX-X)", program: "Standard", fee: "৳10,000/month" },
  { id: 4, name: "Competitive Exam Coaching", program: "Advanced", fee: "৳8,000/month" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
  batchId: string;
  program: "Standard" | "Advanced" | "Professional";
}

interface FormErrors {
  [key: string]: string;
}

export default function Admission() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    fatherName: "",
    address: "",
    batchId: "",
    program: "Standard",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.batchId) newErrors.batchId = "Batch selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "batchId") {
      setFormData((prev) => ({
        ...prev,
        batchId: value,
      }));
    } else if (name === "program") {
      setFormData((prev) => ({
        ...prev,
        program: value as "Standard" | "Advanced" | "Professional",
      }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSubmitStatus("idle");

      const batch = batches.find((b) => b.id === parseInt(formData.batchId));

      const admissionData: CreateAdmissionRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        fatherName: formData.fatherName,
        address: formData.address,
        batchId: parseInt(formData.batchId),
        program: batch?.program as "Standard" | "Advanced" | "Professional",
      };

      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit admission form");
      }

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        fatherName: "",
        address: "",
        batchId: "",
        program: "Standard",
      });
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedBatch = batches.find((b) => b.id === parseInt(formData.batchId));

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {submitStatus === "success" ? (
            // Success Message
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="inline-flex h-16 w-16 bg-green-100 rounded-full items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Application Submitted Successfully!
                </h2>
                <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                  Thank you for your application. Your admission request has been
                  submitted and is now pending review. Our admin team will review
                  your application and contact you within 48 hours.
                </p>
                <div className="bg-green-100 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-green-800">
                    <strong>What happens next?</strong>
                  </p>
                  <ul className="text-sm text-green-800 mt-2 space-y-1">
                    <li>✓ Your application is being reviewed</li>
                    <li>✓ You'll receive an email notification once approved</li>
                    <li>✓ Login credentials will be sent to your email</li>
                  </ul>
                </div>
                <Button
                  onClick={() => setSubmitStatus("idle")}
                  className="bg-primary hover:bg-primary/90"
                >
                  Submit Another Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Form
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Online Admission
                </h1>
                <p className="text-foreground/70">
                  Complete the form below to enroll in any of our programs
                </p>
              </div>

              <Card className="border-primary/20 bg-white mb-8">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <CardTitle>Admission Form</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex gap-3">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            className={`mt-2 ${
                              errors.firstName ? "border-red-500" : ""
                            }`}
                          />
                          {errors.firstName && (
                            <p className="text-xs text-red-600 mt-1">
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            className={`mt-2 ${
                              errors.lastName ? "border-red-500" : ""
                            }`}
                          />
                          {errors.lastName && (
                            <p className="text-xs text-red-600 mt-1">
                              {errors.lastName}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className={`mt-2 ${
                              errors.email ? "border-red-500" : ""
                            }`}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-600 mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+880 1234 567890"
                            className={`mt-2 ${
                              errors.phone ? "border-red-500" : ""
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-600 mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label
                            htmlFor="dateOfBirth"
                            className="text-sm font-medium"
                          >
                            Date of Birth *
                          </Label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className={`mt-2 ${
                              errors.dateOfBirth ? "border-red-500" : ""
                            }`}
                          />
                          {errors.dateOfBirth && (
                            <p className="text-xs text-red-600 mt-1">
                              {errors.dateOfBirth}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="fatherName" className="text-sm font-medium">
                            Father's Name *
                          </Label>
                          <Input
                            id="fatherName"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleInputChange}
                            placeholder="Father's full name"
                            className={`mt-2 ${
                              errors.fatherName ? "border-red-500" : ""
                            }`}
                          />
                          {errors.fatherName && (
                            <p className="text-xs text-red-600 mt-1">
                              {errors.fatherName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label htmlFor="address" className="text-sm font-medium">
                          Address *
                        </Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter your full address"
                          className={`mt-2 ${
                            errors.address ? "border-red-500" : ""
                          }`}
                          rows={3}
                        />
                        {errors.address && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.address}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Batch Selection */}
                    <div className="pt-4 border-t border-primary/10">
                      <h3 className="font-semibold text-foreground mb-4">
                        Program & Batch Selection
                      </h3>

                      <div>
                        <Label htmlFor="batchId" className="text-sm font-medium">
                          Select Batch *
                        </Label>
                        <Select
                          value={formData.batchId}
                          onValueChange={(value) =>
                            handleSelectChange("batchId", value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select a batch" />
                          </SelectTrigger>
                          <SelectContent>
                            {batches.map((batch) => (
                              <SelectItem key={batch.id} value={String(batch.id)}>
                                {batch.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.batchId && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.batchId}
                          </p>
                        )}
                      </div>

                      {selectedBatch && (
                        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="text-sm text-foreground mb-2">
                            <strong>Selected Batch:</strong> {selectedBatch.name}
                          </p>
                          <p className="text-sm text-foreground/70 mb-1">
                            <strong>Program Level:</strong> {selectedBatch.program}
                          </p>
                          <p className="text-sm text-primary font-semibold">
                            <strong>Fee:</strong> {selectedBatch.fee}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-primary/10">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                      <p className="text-xs text-foreground/60 text-center mt-3">
                        By submitting, you agree to our terms and conditions. Your
                        application will be reviewed by our admin team.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="border-blue-600/20 bg-blue-50">
                <CardContent className="pt-6">
                  <p className="text-sm text-blue-900 font-semibold mb-3">
                    About Our Programs:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>
                      <strong>Standard:</strong> Basic level courses suitable for
                      beginners
                    </li>
                    <li>
                      <strong>Advanced:</strong> Intermediate to advanced coursework
                      with in-depth training
                    </li>
                    <li>
                      <strong>Professional:</strong> Professional-grade training with
                      certification
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
