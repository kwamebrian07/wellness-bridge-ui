import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SavedContextType {
  savedDiseases: string[];
  isSaved: (diseaseId: string) => boolean;
  toggleSave: (diseaseId: string) => void;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider = ({ children }: { children: ReactNode }) => {
  const [savedDiseases, setSavedDiseases] = useState<string[]>([]);

  // Load saved diseases from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedDiseases') || '[]');
    setSavedDiseases(saved);
  }, []);

  const isSaved = (diseaseId: string) => {
    return savedDiseases.includes(diseaseId);
  };

  const toggleSave = (diseaseId: string) => {
    const newSavedDiseases = savedDiseases.includes(diseaseId)
      ? savedDiseases.filter(id => id !== diseaseId)
      : [...savedDiseases, diseaseId];
    
    setSavedDiseases(newSavedDiseases);
    localStorage.setItem('savedDiseases', JSON.stringify(newSavedDiseases));
  };

  return (
    <SavedContext.Provider value={{ savedDiseases, isSaved, toggleSave }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
};