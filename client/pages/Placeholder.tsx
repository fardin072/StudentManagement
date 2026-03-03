import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title, description }) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-primary/30 shadow-lg">
            <CardContent className="pt-12 text-center">
              <div className="inline-flex h-16 w-16 bg-primary/10 rounded-full items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
              <p className="text-xl text-foreground/70 mb-8 max-w-md mx-auto leading-relaxed">
                {description}
              </p>
              <p className="text-foreground/60 mb-8">
                This page is coming soon! Use the chat on the left to request
                this feature, and we'll implement it for you.
              </p>
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Placeholder;
