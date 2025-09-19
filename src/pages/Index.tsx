import { useState } from "react";
import { CheckSquare, Calendar, FileText, Plus, BarChart3, Target } from "lucide-react";
import { CaptureBox } from "@/components/CaptureBox";
import { ModuleCard } from "@/components/ModuleCard";
import { AIPreview } from "@/components/AIPreview";

interface AIClassification {
  id: string;
  originalText: string;
  type: "task" | "event" | "note" | "custom";
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  confidence: number;
}

const Index = () => {
  const [currentClassification, setCurrentClassification] = useState<AIClassification | null>(null);

  // Mock AI classification function
  const classifyInput = (text: string, isVoice: boolean): AIClassification => {
    const lowerText = text.toLowerCase();
    
    // Simple AI classification logic (would be actual AI in real app)
    let type: AIClassification["type"] = "note";
    let priority: AIClassification["priority"] | undefined;
    let dueDate: string | undefined;
    let title = text;
    let description: string | undefined;

    if (lowerText.includes("remind") || lowerText.includes("todo") || lowerText.includes("task") || lowerText.includes("need to")) {
      type = "task";
      title = text.replace(/^(remind me to|todo:?|task:?|i need to)\s*/i, "");
      priority = lowerText.includes("urgent") || lowerText.includes("important") ? "high" : 
                lowerText.includes("later") ? "low" : "medium";
    } else if (lowerText.includes("meeting") || lowerText.includes("appointment") || lowerText.includes("call") || lowerText.includes("event")) {
      type = "event";
      title = text;
      description = "Detected calendar event";
    }

    return {
      id: Date.now().toString(),
      originalText: text,
      type,
      title,
      description,
      priority,
      dueDate,
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
    };
  };

  const handleCaptureSubmit = (text: string, isVoice: boolean) => {
    const classification = classifyInput(text, isVoice);
    setCurrentClassification(classification);
  };

  const handleAcceptClassification = (classification: AIClassification) => {
    // In real app, would save to appropriate module
    console.log("Accepted:", classification);
    setCurrentClassification(null);
  };

  const handleRejectClassification = () => {
    setCurrentClassification(null);
  };

  const handleEditClassification = (classification: AIClassification) => {
    // In real app, would open edit modal
    console.log("Edit:", classification);
  };

  const modules = [
    {
      title: "Tasks",
      description: "Your to-dos and action items",
      icon: CheckSquare,
      count: 12,
      gradient: "primary" as const,
      onClick: () => console.log("Navigate to Tasks")
    },
    {
      title: "Calendar",
      description: "Events and appointments", 
      icon: Calendar,
      count: 5,
      gradient: "secondary" as const,
      onClick: () => console.log("Navigate to Calendar")
    },
    {
      title: "Notes",
      description: "Thoughts and ideas",
      icon: FileText,
      count: 28,
      gradient: "accent" as const,
      onClick: () => console.log("Navigate to Notes")
    },
    {
      title: "Habit Tracker",
      description: "Daily routines and progress",
      icon: Target,
      count: 3,
      gradient: "secondary" as const,
      onClick: () => console.log("Navigate to Habits")
    },
  ];

  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Header */}
      <div className="pt-8 pb-4 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Good afternoon! 👋
          </h1>
          <p className="text-foreground-muted">
            What would you like to capture today?
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Capture Box */}
          <div className="animate-fade-in">
            <CaptureBox onSubmit={handleCaptureSubmit} />
          </div>

          {/* AI Preview */}
          {currentClassification && (
            <div className="animate-scale-in">
              <AIPreview
                classification={currentClassification}
                onAccept={handleAcceptClassification}
                onReject={handleRejectClassification}
                onEdit={handleEditClassification}
              />
            </div>
          )}

          {/* Quick Access Modules */}
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Quick Access
              </h2>
              <p className="text-sm text-foreground-muted">
                Jump to your favorite modules
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modules.map((module) => (
                <div key={module.title} className="group animate-fade-in">
                  <ModuleCard {...module} />
                </div>
              ))}
            </div>
          </div>

          {/* Custom Module Builder Preview */}
          <div className="glass-card rounded-xl p-6 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-lg mb-4">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Create Custom Module
            </h3>
            <p className="text-sm text-foreground-muted mb-4">
              Build your own trackers and collections
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-foreground-muted">
              <span className="bg-muted px-2 py-1 rounded">Expense Tracker</span>
              <span className="bg-muted px-2 py-1 rounded">Book Reading</span>
              <span className="bg-muted px-2 py-1 rounded">Mood Journal</span>
              <span className="bg-muted px-2 py-1 rounded">Workout Log</span>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="glass-card rounded-xl p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg text-white">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Today's Overview
                </h3>
                <p className="text-sm text-foreground-muted">
                  Your productivity at a glance
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">8</div>
                <div className="text-xs text-foreground-muted">Items Captured</div>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">5</div>
                <div className="text-xs text-foreground-muted">Tasks Completed</div>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">3</div>
                <div className="text-xs text-foreground-muted">Notes Created</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;