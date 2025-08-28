import { Home, Search, Bookmark, Bell, Settings } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [alertCount, setAlertCount] = useState(0);

  // Get unread alerts count
  useEffect(() => {
    // Sample alerts data - in a real app this would come from an API or store
    const sampleAlerts = [
      { id: "1", isRead: false },
      { id: "2", isRead: false },
      { id: "5", isRead: false }
    ];
    setAlertCount(sampleAlerts.filter(alert => !alert.isRead).length);
  }, []);

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
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.id === "alerts" && alertCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {alertCount > 9 ? "9+" : alertCount}
                    </span>
                  )}
                </div>
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
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.id === "alerts" && alertCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {alertCount > 9 ? "9+" : alertCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};