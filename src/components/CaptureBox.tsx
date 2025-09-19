import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaptureBoxProps {
  onSubmit: (text: string, isVoice: boolean) => void;
}

export const CaptureBox = ({ onSubmit }: CaptureBoxProps) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim(), false);
      setInput("");
    }
  };

  const handleVoiceCapture = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        onSubmit(transcript, true);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        toast({
          title: "Voice error",
          description: "Could not capture voice input",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    }
  };

  return (
    <div className="capture-box animate-fade-in">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-gradient-primary text-2xl font-bold mb-2">
          <Sparkles className="w-6 h-6 animate-pulse-glow" />
          BrainTwo
        </div>
        <p className="text-foreground-muted text-sm">
          Capture anything. AI will organize it perfectly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's on your mind? (text or voice)"
            className="input-focus pr-24 h-14 text-lg bg-background/50 border-border/50"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleVoiceCapture}
              className={`voice-button p-3 rounded-full ${
                isRecording 
                  ? 'bg-accent text-accent-foreground animate-voice-pulse' 
                  : 'hover:bg-accent/20'
              }`}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!input.trim()}
              className="p-3 rounded-full bg-gradient-primary hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>

      {isRecording && (
        <div className="mt-4 p-4 bg-accent/10 rounded-lg animate-pulse">
          <p className="text-accent text-sm text-center">
            🎤 Listening... speak now
          </p>
        </div>
      )}
    </div>
  );
};