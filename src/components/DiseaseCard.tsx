import { Heart, Activity, Shield, Users, Clock, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { DetailedDisease } from "@/data/diseases";

export type DiseaseCategory = "communicable" | "non-communicable" | "emergency";

// Use the basic disease interface for cards
interface Disease {
  id: string;
  name: string;
  category: DiseaseCategory;
  description: string;
  lastUpdated: string;
  isOfflineAvailable?: boolean;
  isSaved?: boolean;
  severity?: "low" | "medium" | "high";
}

interface DiseaseCardProps {
  disease: Disease;
  onClick?: () => void;
  onSave?: () => void;
  variant?: "default" | "compact" | "featured";
}

const categoryConfig = {
  communicable: {
    icon: Users,
    color: "text-warning",
    bgColor: "bg-warning/10",
    label: "Communicable"
  },
  "non-communicable": {
    icon: Activity,
    color: "text-primary",
    bgColor: "bg-primary/10",
    label: "Non-Communicable"
  },
  emergency: {
    icon: Shield,
    color: "text-danger",
    bgColor: "bg-danger/10",
    label: "Emergency"
  }
};

const severityConfig = {
  low: "border-l-success",
  medium: "border-l-warning",
  high: "border-l-danger"
};

export const DiseaseCard = ({ 
  disease, 
  onClick, 
  onSave, 
  variant = "default" 
}: DiseaseCardProps) => {
  const categoryData = categoryConfig[disease.category];
  const CategoryIcon = categoryData.icon;

  if (variant === "compact") {
    return (
      <div 
        className={`p-4 bg-card border border-border rounded-2xl shadow-soft cursor-pointer transition-smooth hover:shadow-medium hover:border-primary/30 ${
          disease.severity ? severityConfig[disease.severity] : ""
        }`}
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CategoryIcon className={`w-4 h-4 ${categoryData.color}`} />
              <span className="text-sm text-text-muted">{categoryData.label}</span>
              {disease.isOfflineAvailable && (
                <div className="w-2 h-2 bg-success rounded-full" title="Available offline" />
              )}
            </div>
            <h3 className="font-semibold text-foreground mb-1">{disease.name}</h3>
            <p className="text-sm text-text-muted line-clamp-2">{disease.description}</p>
          </div>
          
          {onSave && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              className="ml-2 shrink-0"
            >
              {disease.isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
          <Clock className="w-3 h-3" />
          <span>Updated {disease.lastUpdated}</span>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div 
        className="p-6 bg-card border border-border rounded-3xl shadow-medium cursor-pointer transition-smooth hover:shadow-strong hover:border-primary/50 gradient-hero"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-2xl ${categoryData.bgColor}`}>
            <CategoryIcon className={`w-6 h-6 ${categoryData.color}`} />
          </div>
          
          {onSave && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
            >
              {disease.isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-primary" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">{disease.name}</h3>
        <p className="text-text-muted mb-4 line-clamp-3">{disease.description}</p>
        
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryData.color} ${categoryData.bgColor}`}>
            {categoryData.label}
          </span>
          
          <div className="flex items-center gap-2 text-sm text-text-muted">
            {disease.isOfflineAvailable && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Offline</span>
              </div>
            )}
            <Clock className="w-3 h-3" />
            <span>{disease.lastUpdated}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`p-5 bg-card border border-border rounded-2xl shadow-soft cursor-pointer transition-smooth hover:shadow-medium hover:border-primary/30 ${
        disease.severity ? severityConfig[disease.severity] : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${categoryData.bgColor}`}>
            <CategoryIcon className={`w-5 h-5 ${categoryData.color}`} />
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground">{disease.name}</h3>
            <span className="text-sm text-text-muted">{categoryData.label}</span>
          </div>
        </div>
        
        {onSave && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
          >
            {disease.isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-primary" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </Button>
        )}
      </div>
      
      <p className="text-text-muted mb-4 line-clamp-2">{disease.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Clock className="w-4 h-4" />
          <span>Updated {disease.lastUpdated}</span>
        </div>
        
        {disease.isOfflineAvailable && (
          <div className="flex items-center gap-1 text-sm text-success">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Available offline</span>
          </div>
        )}
      </div>
    </div>
  );
};