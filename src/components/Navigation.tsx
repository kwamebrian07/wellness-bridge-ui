import { Home, Search, Bookmark, Bell, Settings } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "browse", label: "Browse", icon: Search },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:bg-card md:border-r md:border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">Health Info</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-smooth ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-text-muted hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile - No Header */}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <nav className="flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition-smooth ${
                  isActive
                    ? "text-primary"
                    : "text-text-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};