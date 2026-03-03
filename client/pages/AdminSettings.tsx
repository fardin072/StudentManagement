import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Lock, Settings as SettingsIcon } from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("organization");
  const [orgData, setOrgData] = useState({
    organizationName: "Biology Care",
    email: "admin@biologycare.com",
    phone: "+880 1234 567890",
    address: "123 Science Street, Education Park",
    city: "Dhaka",
    postalCode: "1205",
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrgData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/admin/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Settings</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-primary/20">
            <button
              onClick={() => setActiveTab("organization")}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "organization"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              <SettingsIcon className="h-4 w-4" />
              Organization
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "security"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              <Lock className="h-4 w-4" />
              Security
            </button>
          </div>

          {/* Organization Tab */}
          {activeTab === "organization" && (
            <div className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Organization Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      value={orgData.organizationName}
                      onChange={handleOrgChange}
                      className="border-primary/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={orgData.email}
                        onChange={handleOrgChange}
                        className="border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={orgData.phone}
                        onChange={handleOrgChange}
                        className="border-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={orgData.address}
                      onChange={handleOrgChange}
                      className="border-primary/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={orgData.city}
                        onChange={handleOrgChange}
                        className="border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={orgData.postalCode}
                        onChange={handleOrgChange}
                        className="border-primary/20"
                      />
                    </div>
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Change Admin Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      value={securityData.currentPassword}
                      onChange={handleSecurityChange}
                      className="border-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                      className="border-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                      className="border-primary/20"
                    />
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-600/20 bg-blue-50">
                <CardContent className="pt-6">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Password Requirements:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Minimum 8 characters</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Include at least one number</li>
                    <li>• Include special characters (@, #, $, etc.)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
