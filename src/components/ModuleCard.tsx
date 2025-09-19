import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count?: number;
  gradient: "primary" | "secondary" | "accent";
  onClick: () => void;
}

export const ModuleCard = ({ 
  title, 
  description, 
  icon: Icon, 
  count, 
  gradient,
  onClick 
}: ModuleCardProps) => {
  const gradientClass = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary", 
    accent: "bg-gradient-accent"
  }[gradient];

  return (
    <div className="module-card group" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${gradientClass} text-white shadow-soft group-hover:shadow-medium transition-all duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        {count !== undefined && (
          <span className="text-2xl font-bold text-foreground-muted group-hover:text-foreground transition-colors">
            {count}
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-gradient-primary transition-all duration-300">
          {title}
        </h3>
        <p className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
          {description}
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="text-xs text-foreground-muted group-hover:text-primary transition-colors">
          Click to open →
        </div>
      </div>
    </div>
  );
};