import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Courses", path: "/courses" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-primary/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              
              <span className="text-xl font-bold text-primary hidden sm:inline">
                BIOLOGY CARE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-foreground hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-foreground">
                  Login
                </Button>
              </Link>
              <Link to="/admission">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Admission
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-primary/10">
              <div className="flex flex-col gap-2 py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-4 py-2 text-foreground hover:bg-primary/5 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex gap-2 px-4 pt-2 border-t border-primary/10">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/admission" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Admission
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-2">Biology Care</h3>
              <p className="text-primary-foreground/80">
                Excellence in Biology Education
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses"
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Email: info@biologycare.com</li>
                <li>Phone: +880 1234 567890</li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <ul className="space-y-2 text-primary-foreground/80 text-sm">
                <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-primary-foreground/80 text-sm">
              <p>&copy; 2024 Biology Care. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
