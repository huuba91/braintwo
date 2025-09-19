import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Edit3, Calendar, CheckSquare, FileText, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface AIPreviewProps {
  classification: AIClassification | null;
  onAccept: (classification: AIClassification) => void;
  onReject: () => void;
  onEdit: (classification: AIClassification) => void;
}

export const AIPreview = ({ classification, onAccept, onReject, onEdit }: AIPreviewProps) => {
  const { toast } = useToast();

  if (!classification) return null;

  const getTypeIcon = () => {
    switch (classification.type) {
      case "task": return <CheckSquare className="w-4 h-4" />;
      case "event": return <Calendar className="w-4 h-4" />;
      case "note": return <FileText className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (classification.type) {
      case "task": return "bg-gradient-primary";
      case "event": return "bg-gradient-secondary";
      case "note": return "bg-gradient-accent";
      default: return "bg-muted";
    }
  };

  const getPriorityColor = () => {
    switch (classification.priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAccept = () => {
    onAccept(classification);
    toast({
      title: "Added successfully",
      description: `"${classification.title}" has been added to your ${classification.type}s`,
    });
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-scale-in max-w-2xl mx-auto mt-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getTypeColor()} text-white shadow-soft`}>
            {getTypeIcon()}
          </div>
          <div>
            <Badge variant="outline" className="mb-1 text-xs">
              AI Detected: {classification.type}
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground-muted">
                {(classification.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReject}
          className="hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3 mb-6">
        <div>
          <label className="text-xs text-foreground-muted">Original Input</label>
          <p className="text-sm bg-muted/50 rounded-lg p-3 mt-1 italic">
            "{classification.originalText}"
          </p>
        </div>

        <div>
          <label className="text-xs text-foreground-muted">AI Interpretation</label>
          <h3 className="text-lg font-semibold text-foreground mt-1">
            {classification.title}
          </h3>
          {classification.description && (
            <p className="text-sm text-foreground-muted mt-1">
              {classification.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {classification.priority && (
            <Badge className={getPriorityColor()}>
              {classification.priority} priority
            </Badge>
          )}
          {classification.dueDate && (
            <Badge variant="outline">
              Due: {new Date(classification.dueDate).toLocaleDateString()}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={handleAccept}
          className="flex-1 bg-gradient-primary hover:opacity-90"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Accept & Add
        </Button>
        <Button
          variant="outline"
          onClick={() => onEdit(classification)}
          className="hover-lift"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
    </div>
  );
};