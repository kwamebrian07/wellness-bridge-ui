import { useState, useEffect, useMemo } from "react";
import { DiseaseCard } from "@/components/DiseaseCard";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart } from "lucide-react";
import { getBasicDiseases } from "@/data/diseases";
import { toast } from "sonner";

interface SavedPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const SavedPage = ({ onNavigate }: SavedPageProps) => {
  const [savedDiseases, setSavedDiseases] = useState<string[]>([]);
  const allDiseases = getBasicDiseases();

  // Load saved diseases from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedDiseases') || '[]');
    setSavedDiseases(saved);
  }, []);

  // Filter to show only saved diseases
  const savedDiseasesData = useMemo(() => {
    return allDiseases.filter(disease => savedDiseases.includes(disease.id));
  }, [savedDiseases, allDiseases]);

  const handleDiseaseClick = (diseaseId: string) => {
    onNavigate("disease-detail", { id: diseaseId });
  };

  const handleRemoveFromSaved = (diseaseId: string) => {
    const newSavedDiseases = savedDiseases.filter(id => id !== diseaseId);
    setSavedDiseases(newSavedDiseases);
    localStorage.setItem('savedDiseases', JSON.stringify(newSavedDiseases));
    
    const disease = allDiseases.find(d => d.id === diseaseId);
    toast.success(`${disease?.name} removed from saved`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Saved Topics</h1>
          <p className="text-muted-foreground">
            Quick access to your bookmarked health information
          </p>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {savedDiseasesData.length} saved {savedDiseasesData.length === 1 ? "topic" : "topics"}
          </p>
        </div>

        {/* Saved Disease List */}
        {savedDiseasesData.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedDiseasesData.map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={{...disease, isSaved: true}}
                variant="default"
                onClick={() => handleDiseaseClick(disease.id)}
                onSave={() => handleRemoveFromSaved(disease.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No saved topics yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring health topics and save the ones you want to reference later.
            </p>
            <Button
              variant="outline"
              onClick={() => onNavigate("browse")}
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Browse Health Topics
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;