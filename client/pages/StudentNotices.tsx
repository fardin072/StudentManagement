import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Pin, AlertCircle, CheckCircle } from "lucide-react";

export default function StudentNotices() {
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);

  const notices = [
    {
      id: 1,
      title: "Exam Schedule - April 2025",
      content:
        "The exam schedule for April 2025 has been released. Please check the attached file for dates and timings of all subjects.",
      date: "Mar 20, 2025",
      priority: "high",
      isPinned: true,
      attachments: ["exam_schedule_april_2025.pdf"],
    },
    {
      id: 2,
      title: "New Study Materials Available",
      content:
        "Study materials for Chapter 5 (Human Physiology) are now available in the Study Materials section. Download them and start preparing.",
      date: "Mar 18, 2025",
      priority: "normal",
      isPinned: false,
      attachments: [],
    },
    {
      id: 3,
      title: "Class Schedule Change",
      content:
        "Due to instructor availability, the HSC Biology class on March 25 is postponed. New class will be held on March 26 at the same time.",
      date: "Mar 15, 2025",
      priority: "high",
      isPinned: true,
      attachments: [],
    },
    {
      id: 4,
      title: "Summer Batch Registration Open",
      content:
        "Registration for summer batch is now open. Limited seats available. Register soon if you want to join our summer intensive program.",
      date: "Mar 10, 2025",
      priority: "normal",
      isPinned: false,
      attachments: ["summer_batch_details.pdf"],
    },
    {
      id: 5,
      title: "Feedback Survey",
      content:
        "Please take 5 minutes to fill our feedback survey. Your feedback helps us improve our teaching methods and course content.",
      date: "Mar 8, 2025",
      priority: "low",
      isPinned: false,
      attachments: [],
    },
    {
      id: 6,
      title: "Holiday Notice",
      content:
        "Classes will be closed on March 23-24 due to local holidays. Classes will resume from March 25.",
      date: "Mar 5, 2025",
      priority: "normal",
      isPinned: false,
      attachments: [],
    },
  ];

  const pinnedNotices = notices.filter((n) => n.isPinned);
  const otherNotices = notices.filter((n) => !n.isPinned);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "normal":
        return "bg-blue-100 text-blue-700";
      case "low":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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

          <h1 className="text-4xl font-bold text-foreground mb-8">Notice Board</h1>

          {/* Pinned Notices */}
          {pinnedNotices.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Pin className="h-5 w-5 text-orange-600" />
                Important Announcements
              </h2>
              <div className="space-y-4">
                {pinnedNotices.map((notice) => (
                  <Card
                    key={notice.id}
                    className="border-orange-600/20 bg-orange-50 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() =>
                      setSelectedNotice(
                        selectedNotice === notice.id ? null : notice.id
                      )
                    }
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-lg mb-2">
                            {notice.title}
                          </h3>
                          <p className="text-sm text-foreground/70 mb-3">
                            {notice.content.length > 150
                              ? notice.content.substring(0, 150) + "..."
                              : notice.content}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-foreground/60">
                              {notice.date}
                            </span>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(
                                notice.priority
                              )}`}
                            >
                              {notice.priority.charAt(0).toUpperCase() +
                                notice.priority.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {selectedNotice === notice.id && (
                        <div className="mt-4 pt-4 border-t border-orange-200">
                          <p className="text-foreground text-sm mb-3">
                            {notice.content}
                          </p>
                          {notice.attachments.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-2">
                                Attachments:
                              </p>
                              <ul className="space-y-1">
                                {notice.attachments.map((attachment, idx) => (
                                  <li key={idx}>
                                    <a
                                      href="#"
                                      className="text-primary hover:underline text-sm"
                                    >
                                      📎 {attachment}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Notices */}
          <h2 className="text-xl font-bold text-foreground mb-4">All Announcements</h2>
          <div className="space-y-4">
            {otherNotices.map((notice) => (
              <Card
                key={notice.id}
                className="border-primary/20 bg-white cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() =>
                  setSelectedNotice(selectedNotice === notice.id ? null : notice.id)
                }
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg mb-2">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-foreground/70 mb-3">
                        {notice.content.length > 150
                          ? notice.content.substring(0, 150) + "..."
                          : notice.content}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-foreground/60">
                          {notice.date}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(
                            notice.priority
                          )}`}
                        >
                          {notice.priority.charAt(0).toUpperCase() +
                            notice.priority.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedNotice === notice.id && (
                    <div className="mt-4 pt-4 border-t border-primary/20">
                      <p className="text-foreground text-sm mb-3">
                        {notice.content}
                      </p>
                      {notice.attachments.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-2">
                            Attachments:
                          </p>
                          <ul className="space-y-1">
                            {notice.attachments.map((attachment, idx) => (
                              <li key={idx}>
                                <a
                                  href="#"
                                  className="text-primary hover:underline text-sm"
                                >
                                  📎 {attachment}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
