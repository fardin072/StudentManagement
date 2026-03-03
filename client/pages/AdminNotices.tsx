import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Edit2, Trash2, Send } from "lucide-react";

export default function AdminNotices() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const notices = [
    {
      id: 1,
      title: "Exam Schedule - April 2025",
      postedDate: "Mar 20, 2025",
      postedBy: "Admin",
      views: 142,
      status: "published",
    },
    {
      id: 2,
      title: "New Study Materials Available",
      postedDate: "Mar 18, 2025",
      postedBy: "Admin",
      views: 98,
      status: "published",
    },
    {
      id: 3,
      title: "Class Schedule Change",
      postedDate: "Mar 15, 2025",
      postedBy: "Admin",
      views: 156,
      status: "published",
    },
    {
      id: 4,
      title: "Summer Batch Registration",
      postedDate: "Mar 10, 2025",
      postedBy: "Admin",
      views: 89,
      status: "published",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-green-600/5 to-primary/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            to="/admin/panel"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Panel
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">
            Notices & Announcements
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Notice Form */}
            <div>
              <Card className="border-primary/20 bg-white sticky top-8">
                <CardHeader>
                  <CardTitle>Post New Notice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Title
                    </label>
                    <Input
                      placeholder="Notice title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      Content
                    </label>
                    <textarea
                      placeholder="Write your notice here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Post Notice
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Published Notices */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Published Notices
                </h2>
                {notices.map((notice) => (
                  <Card key={notice.id} className="border-primary/20 bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-foreground text-lg">
                            {notice.title}
                          </h3>
                          <p className="text-xs text-foreground/60 mt-1">
                            {notice.postedDate} • {notice.views} views
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                          Published
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-primary/20 text-foreground"
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
