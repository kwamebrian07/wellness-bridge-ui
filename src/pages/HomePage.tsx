import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { DiseaseCard } from "@/components/DiseaseCard";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Shield, MessageCircle, Phone, ChevronRight } from "lucide-react";
import healthHero from "@/assets/health-hero.jpg";

const quickAccessDiseases = [
  {
    id: "hiv-aids",
    name: "HIV/AIDS",
    category: "communicable" as const,
    description: "Understanding HIV transmission, prevention, and living with HIV",
    lastUpdated: "2 days ago",
    isOfflineAvailable: true,
    isSaved: false
  },
  {
    id: "hypertension",
    name: "Hypertension",
    category: "non-communicable" as const,
    description: "High blood pressure management and prevention strategies",
    lastUpdated: "1 day ago",
    isOfflineAvailable: true,
    isSaved: true
  },
  {
    id: "malaria",
    name: "Malaria",
    category: "communicable" as const,
    description: "Prevention, symptoms, and treatment of malaria",
    lastUpdated: "3 days ago",
    isOfflineAvailable: true,
    isSaved: false
  },
  {
    id: "diabetes",
    name: "Diabetes",
    category: "non-communicable" as const,
    description: "Type 1 and Type 2 diabetes management and care",
    lastUpdated: "1 week ago",
    isOfflineAvailable: false,
    isSaved: false
  }
];

const categories = [
  {
    id: "communicable",
    name: "Communicable Diseases",
    icon: Shield,
    color: "text-warning",
    bgColor: "bg-warning/10",
    count: 24
  },
  {
    id: "non-communicable",
    name: "Non-Communicable",
    icon: Activity,
    color: "text-primary",
    bgColor: "bg-primary/10",
    count: 18
  },
  {
    id: "emergency",
    name: "Emergency Care",
    icon: Heart,
    color: "text-danger",
    bgColor: "bg-danger/10",
    count: 8
  }
];

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  language: string;
}

export const HomePage = ({ onNavigate, language }: HomePageProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    if (value.trim()) {
      onNavigate("browse", { query: value });
    }
  };

  const handleDiseaseClick = (diseaseId: string) => {
    onNavigate("disease-detail", { id: diseaseId });
  };

  const handleCategoryClick = (categoryId: string) => {
    onNavigate("browse", { category: categoryId });
  };

  const handleSaveDisease = (diseaseId: string) => {
    // In a real app, this would update the saved state
    console.log(`Toggling save for disease: ${diseaseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Trusted Health Information
              </h1>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                Access reliable health information in your language. Learn about diseases, 
                prevention, and get connected with health professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => onNavigate("contact")}
                  className="gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Talk to a Professional
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate("browse")}
                  className="gap-3"
                >
                  Browse Diseases
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="text-sm text-text-muted">
                <p>🚨 For emergencies in Ghana, call <strong>112</strong></p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <img 
                src={healthHero} 
                alt="Healthcare professionals providing trusted medical information"
                className="w-full h-auto rounded-3xl shadow-strong"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Search Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Search Health Topics</h2>
          <SearchBar 
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={handleSearch}
            placeholder="Search for diseases, symptoms, or health topics..."
          />
        </section>

        {/* Quick Access Diseases */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Quick Access</h2>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("browse")}
              className="gap-2"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {quickAccessDiseases.slice(0, 2).map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                variant="featured"
                onClick={() => handleDiseaseClick(disease.id)}
                onSave={() => handleSaveDisease(disease.id)}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="p-6 bg-card border border-border rounded-2xl shadow-soft cursor-pointer transition-smooth hover:shadow-medium hover:border-primary/30"
                >
                  <div className={`p-3 rounded-2xl ${category.bgColor} w-fit mb-4`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                  <p className="text-text-muted text-sm mb-4">
                    {category.count} topics available
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Explore
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Professional CTA */}
        <section className="bg-card border border-border rounded-3xl p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need Personalized Help?
            </h3>
            <p className="text-text-muted mb-8 leading-relaxed">
              Connect with qualified health professionals for personalized advice. 
              Available for chat consultations and scheduled calls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => onNavigate("contact")}
                className="gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Start Chat
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate("contact")}
                className="gap-3"
              >
                <Phone className="w-5 h-5" />
                Schedule Call
              </Button>
            </div>
            <p className="text-xs text-text-muted mt-4">
              Advisory consultations only — not a substitute for medical diagnosis
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};