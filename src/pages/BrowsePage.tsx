import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { DiseaseCard } from "@/components/DiseaseCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
import { getBasicDiseases, diseaseDatabase } from "@/data/diseases";
import { toast } from "sonner";

// Get diseases from the centralized data source
const allDiseases = getBasicDiseases();

const filterOptions = [
  { id: "all", label: "All Diseases" },
  { id: "communicable", label: "Communicable" },
  { id: "non-communicable", label: "Non-Communicable" },
  { id: "emergency", label: "Emergency" },
  { id: "saved", label: "Saved" },
  { id: "offline", label: "Available Offline" }
];

interface BrowsePageProps {
  onNavigate: (page: string, params?: any) => void;
  initialQuery?: string;
  initialCategory?: string;
}

export const BrowsePage = ({ onNavigate, initialQuery = "", initialCategory = "all" }: BrowsePageProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFilter, setSelectedFilter] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [savedDiseases, setSavedDiseases] = useState<string[]>([]);

  // Load saved diseases from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedDiseases') || '[]');
    setSavedDiseases(saved);
  }, []);

  const filteredDiseases = useMemo(() => {
    let filtered = [...allDiseases];

    // Apply search filter - now searches through comprehensive content
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(disease => {
        // Search in basic disease info
        const basicMatch = disease.name.toLowerCase().includes(query) ||
                          disease.description.toLowerCase().includes(query);
        
        // Search in detailed content
        const detailedDisease = diseaseDatabase.find(d => d.id === disease.id);
        if (!detailedDisease) return basicMatch;
        
        const content = detailedDisease.content.en;
        const detailedMatch = content.overview.toLowerCase().includes(query) ||
                             content.symptoms.some(s => s.toLowerCase().includes(query)) ||
                             content.causes.some(c => c.toLowerCase().includes(query)) ||
                             content.prevention.some(p => p.toLowerCase().includes(query)) ||
                             content.treatment.some(t => t.toLowerCase().includes(query)) ||
                             (content.complications?.some(c => c.toLowerCase().includes(query)) || false) ||
                             (content.riskFactors?.some(r => r.toLowerCase().includes(query)) || false) ||
                             (content.diagnosis?.some(d => d.toLowerCase().includes(query)) || false) ||
                             (content.livingWith?.some(l => l.toLowerCase().includes(query)) || false) ||
                             content.faqs.some(faq => 
                               faq.question.toLowerCase().includes(query) || 
                               faq.answer.toLowerCase().includes(query)
                             ) ||
                             content.resources.some(r => 
                               r.title.toLowerCase().includes(query) || 
                               r.description.toLowerCase().includes(query)
                             );
        
        return basicMatch || detailedMatch;
      });
    }

    // Apply category filter
    if (selectedFilter === "saved") {
      filtered = filtered.filter(disease => savedDiseases.includes(disease.id));
    } else if (selectedFilter === "offline") {
      filtered = filtered.filter(disease => disease.isOfflineAvailable);
    } else if (selectedFilter !== "all") {
      filtered = filtered.filter(disease => disease.category === selectedFilter);
    }

    return filtered;
  }, [searchQuery, selectedFilter, savedDiseases]);

  const handleDiseaseClick = (diseaseId: string) => {
    onNavigate("disease-detail", { id: diseaseId });
  };

  const handleSaveDisease = (diseaseId: string) => {
    const newSavedDiseases = savedDiseases.includes(diseaseId)
      ? savedDiseases.filter(id => id !== diseaseId)
      : [...savedDiseases, diseaseId];
    
    setSavedDiseases(newSavedDiseases);
    localStorage.setItem('savedDiseases', JSON.stringify(newSavedDiseases));
    
    const disease = allDiseases.find(d => d.id === diseaseId);
    const action = newSavedDiseases.includes(diseaseId) ? "saved" : "removed from saved";
    toast.success(`${disease?.name} ${action}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Health Topics</h1>
          <p className="text-muted-foreground">
            Explore our comprehensive database of health information
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search diseases, symptoms, or health topics..."
          />
        </div>

        {/* Filters and View Options */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedFilter(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === option.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">View:</span>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredDiseases.length} {filteredDiseases.length === 1 ? "result" : "results"} found
            {selectedFilter !== "all" && ` in ${filterOptions.find(f => f.id === selectedFilter)?.label.toLowerCase()}`}
          </p>
        </div>

        {/* Disease List */}
        {filteredDiseases.length > 0 ? (
          <div className={
            viewMode === "grid" 
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4"
          }>
            {filteredDiseases.map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={{...disease, isSaved: savedDiseases.includes(disease.id)}}
                variant={viewMode === "grid" ? "default" : "compact"}
                onClick={() => handleDiseaseClick(disease.id)}
                onSave={() => handleSaveDisease(disease.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery 
                ? `No diseases match "${searchQuery}". Try different keywords or browse by category.`
                : "No diseases match your current filters. Try adjusting your selection."
              }
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;