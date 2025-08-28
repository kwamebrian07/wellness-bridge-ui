import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "tw", name: "Twi", native: "Twi" },
  { code: "ee", name: "Ewe", native: "Eʋegbe" },
  { code: "ga", name: "Ga", native: "Gã" },
  { code: "ha", name: "Hausa", native: "Hausa" },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
  variant?: "compact" | "full";
}

export const LanguageSelector = ({ 
  selectedLanguage, 
  onLanguageChange, 
  variant = "full" 
}: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "compact") {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <Globe className="w-4 h-4" />
          {languages.find(l => l.code === selectedLanguage)?.native}
        </Button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-2xl shadow-medium p-2 min-w-48 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-smooth text-left"
              >
                <div>
                  <div className="font-medium">{lang.native}</div>
                  <div className="text-sm text-text-muted">{lang.name}</div>
                </div>
                {selectedLanguage === lang.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold">Choose Your Language</h3>
      </div>
      
      <div className="grid gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-smooth ${
              selectedLanguage === lang.code
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <div className="text-left">
              <div className="font-medium">{lang.native}</div>
              <div className="text-sm text-text-muted">{lang.name}</div>
            </div>
            {selectedLanguage === lang.code && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};