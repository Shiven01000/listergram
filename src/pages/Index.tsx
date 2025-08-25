import { useAuth } from "@/contexts/AuthContext";
import { AuthScreen } from "@/components/AuthScreen";
import { Listergram } from "@/components/Listergram";
import { Loader2, GraduationCap } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold text-primary animate-pulse">Listergram</h1>
          </div>
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your Lister community...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return <Listergram />;
};

export default Index;
