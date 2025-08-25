import { useState } from "react";
import { Listergram } from "@/components/Listergram";
import heroImage from "@/assets/listergram-hero.jpg";
import listerTowers from "@/assets/lister-towers.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Calendar, MessageCircle, MapPin, GraduationCap } from "lucide-react";

const Index = () => {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <Listergram />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white space-y-8 max-w-md mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-lister-gold bg-clip-text text-transparent">
              Listergram
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Your exclusive social network for University of Alberta Lister Residence
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Heart className="h-3 w-3 mr-1" />
                Connect & Date
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Users className="h-3 w-3 mr-1" />
                Make Friends  
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Calendar className="h-3 w-3 mr-1" />
                Campus Events
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <MessageCircle className="h-3 w-3 mr-1" />
                Study Groups
              </Badge>
            </div>

            <Button 
              size="lg"
              onClick={() => setShowApp(true)}
              className="bg-gradient-to-r from-primary to-lister-gold hover:from-primary-glow hover:to-accent-light text-white font-semibold px-8 py-4 text-lg shadow-glow transition-all duration-300 hover:scale-105"
            >
              Enter Listergram
            </Button>

            <p className="text-sm text-white/70">
              Exclusively for @ualberta.ca students living in Lister Residence
            </p>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-lister-gold bg-clip-text text-transparent">
              Connect. Share. Belong.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The only social platform designed specifically for Lister students. Make meaningful connections with people just floors away.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Social Feed */}
            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Social Feed</h3>
              <p className="text-muted-foreground">
                Share moments, photos, and experiences with your Lister community. See what's happening on your floor and beyond.
              </p>
            </Card>

            {/* Events Hub */}
            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Events Hub</h3>
              <p className="text-muted-foreground">
                Discover study sessions, social events, and activities. RSVP to events and never miss out on the Lister experience.
              </p>
            </Card>

            {/* Dating & Friends */}
            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-social-like/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-social-like" />
              </div>
              <h3 className="text-xl font-semibold">Connect & Match</h3>
              <p className="text-muted-foreground">
                Find study partners, make friends, or discover romance. Connect with people who share your interests and proximity.
              </p>
            </Card>

            {/* Tower Communities */}
            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-lister-green/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-lister-green" />
              </div>
              <h3 className="text-xl font-semibold">Tower Communities</h3>
              <p className="text-muted-foreground">
                Connect with residents from Henday, Mackenzie, Schaffer, Kelsey, and Assiniboia. Each tower has its unique culture.
              </p>
            </Card>

            {/* Study Groups */}
            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Study Partners</h3>
              <p className="text-muted-foreground">
                Find classmates for group study sessions. Share notes, form study groups, and succeed together academically.
              </p>
            </Card>

            {/* Real-time Chat */}
            <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Instant Messaging</h3>
              <p className="text-muted-foreground">
                Chat instantly with matches, friends, and study partners. Share photos, voice messages, and stay connected 24/7.
              </p>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg"
              onClick={() => setShowApp(true)}
              className="bg-gradient-to-r from-primary to-lister-gold hover:from-primary-glow hover:to-accent-light text-white font-semibold px-8 py-4 text-lg shadow-glow transition-all duration-300 hover:scale-105"
            >
              Start Connecting Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
