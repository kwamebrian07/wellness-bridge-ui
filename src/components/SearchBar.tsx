import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export const SearchBar = ({ 
  placeholder = "Search disease or symptom…",
  value = "",
  onChange,
  onSubmit
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleChange = (newValue: string) => {
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(searchValue);
  };

  const handleClear = () => {
    setSearchValue("");
    onChange?.("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-12 bg-muted border border-border rounded-2xl text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-text-muted/20 hover:bg-text-muted/30 transition-smooth"
          >
            <X className="w-4 h-4 text-text-muted" />
          </button>
        )}
      </div>
    </form>
  );
};