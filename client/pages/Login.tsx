import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeRole, setActiveRole] = useState("student");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation - check if it's the demo account
    if (
      credentials.email === "demo@biologycare.com" &&
      credentials.password === "Demo@123"
    ) {
      toast({
        title: "Login Successful",
        description: `Welcome ${activeRole}! Redirecting to your panel...`,
      });

      // Redirect based on role
      setTimeout(() => {
        if (activeRole === "student") {
          navigate("/student/panel");
        } else if (activeRole === "admin") {
          navigate("/admin/panel");
        } else {
          navigate("/student/panel"); // Guardian also goes to student panel for now
        }
      }, 500);
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please use the demo credentials shown above.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-20">
        <div className="max-w-md mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Card className="border-primary/30 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">
                Biology Care
              </CardTitle>
              <p className="text-foreground/60 mt-2">Sign In to Your Account</p>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <p className="font-semibold mb-1">Demo Credentials:</p>
                <p>Email: <code className="bg-white px-2 py-1 rounded">demo@biologycare.com</code></p>
                <p>Password: <code className="bg-white px-2 py-1 rounded">Demo@123</code></p>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs value={activeRole} onValueChange={setActiveRole}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="guardian">Guardian</TabsTrigger>
                </TabsList>

                <TabsContent value="student">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="student@example.com"
                          value={credentials.email}
                          onChange={handleInputChange}
                          required
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={credentials.password}
                          onChange={handleInputChange}
                          required
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-primary/20"
                        />
                        <span className="text-foreground/70">Remember me</span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-primary hover:text-primary/80"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                    >
                      Sign In
                    </Button>

                    <p className="text-center text-sm text-foreground/60">
                      Don't have an account?{" "}
                      <Link to="/admission" className="text-primary hover:text-primary/80 font-semibold">
                        Register here
                      </Link>
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="admin">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email" className="text-foreground">
                        Admin Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
                        <Input
                          id="admin-email"
                          name="email"
                          type="email"
                          placeholder="admin@biologycare.com"
                          value={credentials.email}
                          onChange={handleInputChange}
                          required
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-password" className="text-foreground">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
                        <Input
                          id="admin-password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={credentials.password}
                          onChange={handleInputChange}
                          required
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-primary/20"
                        />
                        <span className="text-foreground/70">Remember me</span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-primary hover:text-primary/80"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                    >
                      Sign In as Admin
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="guardian">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardian-email" className="text-foreground">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
                        <Input
                          id="guardian-email"
                          name="email"
                          type="email"
                          placeholder="guardian@example.com"
                          value={credentials.email}
                          onChange={handleInputChange}
                          required
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardian-password" className="text-foreground">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
                        <Input
                          id="guardian-password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={credentials.password}
                          onChange={handleInputChange}
                          required
                          className="pl-10 border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-primary/20"
                        />
                        <span className="text-foreground/70">Remember me</span>
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-primary hover:text-primary/80"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                    >
                      Sign In as Guardian
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
