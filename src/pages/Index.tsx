import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { LanguageSelector } from "@/components/LanguageSelector";
import { HomePage } from "@/pages/HomePage";
import { BrowsePage } from "@/pages/BrowsePage";
import SavedPage from "@/pages/SavedPage";
import AlertsPage from "@/pages/AlertsPage";
import DiseaseDetailPage from "@/pages/DiseaseDetailPage";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { AlertProvider } from "@/contexts/AlertContext";
import { SavedProvider } from "@/contexts/SavedContext";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pageParams, setPageParams] = useState<any>({});

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    setPageParams(params || {});
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} language={currentLanguage} />;
      case "browse":
        return (
          <BrowsePage 
            onNavigate={handleNavigate}
            initialQuery={pageParams.query}
            initialCategory={pageParams.category}
          />
        );
      case "saved":
        return <SavedPage onNavigate={handleNavigate} />;
      case "alerts":
        return <AlertsPage onNavigate={handleNavigate} />;
      case "settings":
        return (
          <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>
              <div className="max-w-2xl space-y-8">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Language Preferences</h3>
                  <LanguageSelector 
                    selectedLanguage={currentLanguage}
                    onLanguageChange={setCurrentLanguage}
                    variant="compact"
                  />
                </div>
                
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-text-muted">Switch between light and dark themes</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleDarkMode}
                    >
                      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center max-w-lg mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Health Professional</h2>
              <p className="text-text-muted mb-8">
                Connect with qualified health professionals for personalized guidance and support.
              </p>
              <div className="space-y-4">
                <Button variant="hero" size="lg" className="w-full">
                  Start Chat Consultation
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Schedule Phone Call
                </Button>
              </div>
              <p className="text-xs text-text-muted mt-6">
                🔒 All consultations are confidential and for advisory purposes only
              </p>
            </div>
          </div>
        );
      case "disease-detail":
        return (
          <DiseaseDetailPage 
            diseaseId={pageParams.id} 
            onNavigate={handleNavigate}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} language={currentLanguage} />;
    }
  };

  return (
    <AlertProvider>
      <SavedProvider>
        <div className="min-h-screen bg-background">
          <div className="flex">
            <Navigation currentPage={currentPage} onPageChange={handleNavigate} />
            
            <main className="flex-1 pb-20 md:pb-0">
              {renderPage()}
            </main>
          </div>
          <Toaster />
        </div>
      </SavedProvider>
    </AlertProvider>
  );
};

export default Index;
