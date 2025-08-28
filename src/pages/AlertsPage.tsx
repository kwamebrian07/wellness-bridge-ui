import { useState } from "react";
import { Bell, X, Clock, MapPin, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAlerts } from "@/contexts/AlertContext";

const alertConfig = {
  emergency: {
    icon: AlertTriangle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    iconColor: "text-destructive"
  },
  warning: {
    icon: AlertTriangle,
    color: "bg-orange-500/10 text-orange-700 border-orange-500/20",
    iconColor: "text-orange-500"
  },
  info: {
    icon: Info,
    color: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    iconColor: "text-blue-500"
  },
  "health-tip": {
    icon: CheckCircle,
    color: "bg-green-500/10 text-green-700 border-green-500/20",
    iconColor: "text-green-500"
  }
};

interface AlertsPageProps {
  onNavigate: (page: string) => void;
}

export const AlertsPage = ({ onNavigate }: AlertsPageProps) => {
  const { alerts, unreadCount, markAsRead, markAllAsRead, deleteAlert } = useAlerts();
  const [filter, setFilter] = useState<"all" | "unread" | "emergency">("all");

  const filteredAlerts = alerts.filter(alert => {
    if (filter === "unread") return !alert.isRead;
    if (filter === "emergency") return alert.type === "emergency";
    return true;
  });

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success("All alerts marked as read");
  };

  const handleDeleteAlert = (alertId: string) => {
    deleteAlert(alertId);
    toast.success("Alert deleted");
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Health Alerts</h1>
            <p className="text-muted-foreground">
              Stay updated with important health notifications
            </p>
          </div>
           {unreadCount > 0 && (
             <Button 
               variant="outline" 
               onClick={handleMarkAllAsRead}
               className="hidden sm:flex"
             >
               Mark all as read ({unreadCount})
             </Button>
           )}
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "all", label: "All Alerts" },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "emergency", label: "Emergency" }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                filter === option.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Mobile Mark All Read */}
        {unreadCount > 0 && (
           <div className="sm:hidden mb-4">
             <Button 
               variant="outline" 
               onClick={handleMarkAllAsRead}
               size="sm"
               className="w-full"
             >
               Mark all as read ({unreadCount})
             </Button>
           </div>
        )}

        {/* Alerts List */}
        {filteredAlerts.length > 0 ? (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const config = alertConfig[alert.type];
              const Icon = config.icon;
              
              return (
                <Card 
                  key={alert.id} 
                  className={`border transition-all ${
                    !alert.isRead ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${config.color}`}>
                        <Icon className={`w-5 h-5 ${config.iconColor}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {alert.title}
                            </h3>
                            {!alert.isRead && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => handleDeleteAlert(alert.id)}
                             className="opacity-60 hover:opacity-100"
                           >
                             <X className="w-4 h-4" />
                           </Button>
                        </div>
                        
                        <p className="text-muted-foreground mb-3 leading-relaxed">
                          {alert.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTimestamp(alert.timestamp)}</span>
                          </div>
                          
                          {alert.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{alert.location}</span>
                            </div>
                          )}
                          
                          <Badge 
                            variant={alert.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {alert.priority} priority
                          </Badge>
                        </div>
                        
                        {!alert.isRead && (
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(alert.id)}
                            >
                              Mark as read
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No alerts found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {filter === "unread" 
                ? "You have no unread alerts."
                : filter === "emergency"
                ? "No emergency alerts at this time."
                : "You're all caught up! Check back later for new health alerts."
              }
            </p>
            {filter !== "all" && (
              <Button
                variant="outline"
                onClick={() => setFilter("all")}
              >
                View all alerts
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;