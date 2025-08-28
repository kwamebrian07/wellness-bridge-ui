import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { DiseaseCard } from "@/components/DiseaseCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";

const allDiseases = [
  {
    id: "hiv-aids",
    name: "HIV/AIDS",
    category: "communicable" as const,
    description: "Understanding HIV transmission, prevention, and living with HIV. Comprehensive guide covering symptoms, testing, treatment options, and support resources.",
    lastUpdated: "2 days ago",
    isOfflineAvailable: true,
    isSaved: false,
    severity: "high" as const
  },
  {
    id: "hypertension",
    name: "Hypertension",
    category: "non-communicable" as const,
    description: "High blood pressure management and prevention strategies. Learn about risk factors, lifestyle changes, medications, and monitoring techniques.",
    lastUpdated: "1 day ago",
    isOfflineAvailable: true,
    isSaved: true,
    severity: "medium" as const
  },
  {
    id: "malaria",
    name: "Malaria",
    category: "communicable" as const,
    description: "Prevention, symptoms, and treatment of malaria. Essential information for prevention, recognizing symptoms, and seeking timely treatment.",
    lastUpdated: "3 days ago",
    isOfflineAvailable: true,
    isSaved: false,
    severity: "high" as const
  },
  {
    id: "diabetes",
    name: "Diabetes",
    category: "non-communicable" as const,
    description: "Type 1 and Type 2 diabetes management and care. Comprehensive guide to blood sugar monitoring, diet management, and long-term care.",
    lastUpdated: "1 week ago",
    isOfflineAvailable: false,
    isSaved: false,
    severity: "medium" as const
  },
  {
    id: "tuberculosis",
    name: "Tuberculosis",
    category: "communicable" as const,
    description: "TB prevention, diagnosis, and treatment protocols. Understanding drug-resistant TB and the importance of completing treatment courses.",
    lastUpdated: "5 days ago",
    isOfflineAvailable: true,
    isSaved: false,
    severity: "high" as const
  },
  {
    id: "heart-disease",
    name: "Heart Disease",
    category: "non-communicable" as const,
    description: "Cardiovascular health, prevention, and management. Learn about heart attack symptoms, prevention strategies, and cardiac rehabilitation.",
    lastUpdated: "4 days ago",
    isOfflineAvailable: false,
    isSaved: true,
    severity: "high" as const
  },
  {
    id: "stroke",
    name: "Stroke",
    category: "emergency" as const,
    description: "Recognizing stroke symptoms and emergency response. Critical information about FAST signs, emergency treatment, and rehabilitation.",
    lastUpdated: "2 days ago",
    isOfflineAvailable: true,
    isSaved: false,
    severity: "high" as const
  },
  {
    id: "cholera",
    name: "Cholera",
    category: "communicable" as const,
    description: "Cholera prevention and emergency treatment. Water safety, sanitation practices, and recognizing dehydration symptoms.",
    lastUpdated: "1 week ago",
    isOfflineAvailable: true,
    isSaved: false,
    severity: "high" as const
  }
];

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

  const filteredDiseases = useMemo(() => {
    let filtered = [...allDiseases];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(disease =>
        disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter === "saved") {
      filtered = filtered.filter(disease => disease.isSaved);
    } else if (selectedFilter === "offline") {
      filtered = filtered.filter(disease => disease.isOfflineAvailable);
    } else if (selectedFilter !== "all") {
      filtered = filtered.filter(disease => disease.category === selectedFilter);
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const handleDiseaseClick = (diseaseId: string) => {
    onNavigate("disease-detail", { id: diseaseId });
  };

  const handleSaveDisease = (diseaseId: string) => {
    // In a real app, this would update the saved state
    console.log(`Toggling save for disease: ${diseaseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Health Topics</h1>
          <p className="text-text-muted">
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                  selectedFilter === option.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-text-muted hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted mr-2">View:</span>
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
          <p className="text-sm text-text-muted">
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
                disease={disease}
                variant={viewMode === "grid" ? "default" : "compact"}
                onClick={() => handleDiseaseClick(disease.id)}
                onSave={() => handleSaveDisease(disease.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-text-muted mb-6 max-w-md mx-auto">
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