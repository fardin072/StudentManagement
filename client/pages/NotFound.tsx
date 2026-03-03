import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl font-semibold text-foreground mb-2">
            Page Not Found
          </p>
          <p className="text-lg text-foreground/70 mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. Let's get you back
            on track!
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
