import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, MapPin, Users, Edit2, Trash2, X, Clock } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: string[];
  eventType: "class" | "exam" | "workshop" | "announcement";
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "HSC Biology Regular Class",
      date: "Mar 22, 2025",
      time: "5:00 PM - 7:00 PM",
      location: "Biology Lab A",
      description: "Regular class session covering Cell Division and Genetics",
      attendees: ["Batch: HSC Biology"],
      eventType: "class",
    },
    {
      id: 2,
      title: "Medical Entrance Mock Exam",
      date: "Mar 25, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Exam Hall",
      description: "Full-length mock exam for medical entrance preparation",
      attendees: ["Batch: Medical Entrance Prep"],
      eventType: "exam",
    },
    {
      id: 3,
      title: "Biology Research Workshop",
      date: "Mar 28, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Conference Room",
      description: "Workshop on latest research methodologies in biology",
      attendees: ["All Students"],
      eventType: "workshop",
    },
    {
      id: 4,
      title: "Important Announcement",
      date: "Mar 20, 2025",
      time: "2:00 PM",
      location: "Online",
      description: "Summer batch registration announcement",
      attendees: ["All"],
      eventType: "announcement",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    eventType: "class" as const,
  });

  const handleOpenModal = (event?: Event) => {
    if (event) {
      setEditingId(event.id);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        eventType: event.eventType,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        eventType: "class",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (editingId) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingId
            ? {
                ...event,
                ...formData,
                attendees: event.attendees,
              }
            : event
        )
      );
    } else {
      const newEvent: Event = {
        id: Math.max(...events.map((e) => e.id), 0) + 1,
        ...formData,
        attendees: ["All"],
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((event) => event.id !== id));
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-700";
      case "exam":
        return "bg-red-100 text-red-700";
      case "workshop":
        return "bg-purple-100 text-purple-700";
      case "announcement":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">Event Management</h1>
            <Button
              onClick={() => handleOpenModal()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>

          {/* Events Timeline */}
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="border-primary/20 bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-foreground text-lg">
                          {event.title}
                        </h3>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${getEventTypeColor(
                            event.eventType
                          )}`}
                        >
                          {event.eventType.charAt(0).toUpperCase() +
                            event.eventType.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-foreground/70">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{event.attendees.join(", ")}</span>
                        </div>
                      </div>

                      <p className="text-sm text-foreground mt-3">
                        {event.description}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        onClick={() => handleOpenModal(event)}
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(event.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="border-primary/20 bg-white">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Total Events</p>
                <p className="text-3xl font-bold text-foreground">{events.length}</p>
              </CardContent>
            </Card>
            <Card className="border-blue-600/20 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Classes</p>
                <p className="text-3xl font-bold text-blue-600">
                  {events.filter((e) => e.eventType === "class").length}
                </p>
              </CardContent>
            </Card>
            <Card className="border-red-600/20 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Exams</p>
                <p className="text-3xl font-bold text-red-600">
                  {events.filter((e) => e.eventType === "exam").length}
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-600/20 bg-purple-50">
              <CardContent className="pt-6">
                <p className="text-sm text-foreground/70 mb-2">Workshops</p>
                <p className="text-3xl font-bold text-purple-600">
                  {events.filter((e) => e.eventType === "workshop").length}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="border-primary/20 bg-white max-w-2xl w-full max-h-96 overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {editingId ? "Edit Event" : "Create New Event"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseModal}
                  className="text-foreground/70 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., HSC Biology Class"
                  className="border-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g., Mar 22, 2025"
                    className="border-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g., 5:00 PM - 7:00 PM"
                    className="border-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Biology Lab A"
                  className="border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary bg-white"
                >
                  <option value="class">Class</option>
                  <option value="exam">Exam</option>
                  <option value="workshop">Workshop</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Event description"
                  rows={4}
                  className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-primary/20">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  {editingId ? "Update Event" : "Create Event"}
                </Button>
                <Button
                  onClick={handleCloseModal}
                  variant="outline"
                  className="flex-1 border-primary/20 text-foreground"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Layout>
  );
}
