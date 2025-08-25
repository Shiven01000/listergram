import { useState } from "react";
import { Heart, Home, Calendar, Users, User, Plus, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Layout = ({ children, activeTab = "home", onTabChange }: LayoutProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "dating", icon: Heart, label: "Connect" },
    { id: "messages", icon: MessageCircle, label: "Messages" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="mobile-container min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-lister-gold bg-clip-text text-transparent">
                Listergram
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-social-notification text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="sticky bottom-0 z-50 bg-background/95 backdrop-blur-md border-t border-border px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`bottom-nav-item ${isActive ? 'active' : 'text-muted-foreground'}`}
                >
                  <Icon className={`h-6 w-6 transition-all duration-200 ${
                    isActive ? 'scale-110' : 'hover:scale-105'
                  }`} />
                  <span className={`text-xs font-medium mt-1 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Floating Action Button */}
        <Button className="floating-action-btn text-white">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};