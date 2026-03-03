import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Lock, Bell, Eye } from "lucide-react";

export default function StudentSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    fullName: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+880 1234 567890",
    enrollmentId: "BC2024001",
    course: "HSC Biology",
    dateOfBirth: "2007-05-15",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    classReminders: true,
    examAlerts: true,
    feeDue: true,
    newsAndUpdates: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/student/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Settings</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-primary/20">
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                activeTab === "profile"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                activeTab === "security"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                activeTab === "notifications"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              Notifications
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        className="border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={handleProfileChange}
                        className="border-primary/20"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Enrollment ID</Label>
                      <div className="px-3 py-2 border border-primary/20 rounded-md bg-primary/5 text-foreground">
                        {profileData.enrollmentId}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Course</Label>
                      <div className="px-3 py-2 border border-primary/20 rounded-md bg-primary/5 text-foreground">
                        {profileData.course}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      className="border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      className="border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      className="border-primary/20"
                    />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle>Security Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-primary/10 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">Two-Factor Authentication</h4>
                      <p className="text-sm text-foreground/70">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" className="border-primary/20">
                      Enable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <Card className="border-primary/20 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold text-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-sm text-foreground/70">
                          {key === "emailNotifications" && "Receive email notifications"}
                          {key === "classReminders" && "Get reminders before class"}
                          {key === "examAlerts" && "Be notified about upcoming exams"}
                          {key === "feeDue" && "Receive fee due reminders"}
                          {key === "newsAndUpdates" && "Get news and platform updates"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleNotificationChange(
                            key as keyof typeof notificationSettings
                          )
                        }
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          value ? "bg-primary" : "bg-primary/20"
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            value ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
