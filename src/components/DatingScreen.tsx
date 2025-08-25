import { useState } from "react";
import { Heart, X, Star, MessageCircle, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Profile {
  id: string;
  name: string;
  age: number;
  tower: string;
  floor: number;
  program: string;
  year: string;
  bio: string;
  interests: string[];
  photos: string[];
  distance: string;
  isOnline: boolean;
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Emma",
    age: 20,
    tower: "Mackenzie",
    floor: 8,
    program: "Engineering",
    year: "2nd Year",
    bio: "Coffee enthusiast ☕ Love exploring Edmonton and trying new restaurants! Always down for study dates or weekend adventures 🌟",
    interests: ["Coffee", "Hiking", "Photography", "Study Groups", "Movies"],
    photos: [""],
    distance: "2 floors away",
    isOnline: true
  },
  {
    id: "2", 
    name: "Alex",
    age: 21,
    tower: "Henday",
    floor: 12,
    program: "Business",
    year: "3rd Year",
    bio: "Gym enthusiast 💪 Business student who loves networking and meeting new people. Let's grab lunch at the caf sometime!",
    interests: ["Fitness", "Business", "Networking", "Basketball", "Travel"],
    photos: [""],
    distance: "Different tower",
    isOnline: false
  },
  {
    id: "3",
    name: "Maya",
    age: 19,
    tower: "Schaffer",
    floor: 5,
    program: "Arts",
    year: "1st Year",
    bio: "Artist at heart 🎨 New to Lister and looking to make friends! Love painting, music, and deep conversations over late night snacks.",
    interests: ["Art", "Music", "Books", "Painting", "Philosophy"],
    photos: [""],
    distance: "Different tower",
    isOnline: true
  }
];

export const DatingScreen = () => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mode, setMode] = useState<'dating' | 'friends'>('friends');

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate the card
    const card = document.querySelector('.swipe-card');
    if (card) {
      card.classList.add(direction === 'right' ? 'animate-swipe-right' : 'animate-swipe-left');
    }

    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset to beginning or show "no more profiles" message
        setCurrentIndex(0);
      }
      setIsAnimating(false);
      
      // Reset card position
      if (card) {
        card.classList.remove('animate-swipe-right', 'animate-swipe-left');
      }
    }, 600);
  };

  const handleSuperLike = () => {
    // Handle super like action
    handleSwipe('right');
  };

  if (!currentProfile) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto" />
          <h3 className="text-xl font-semibold">No more profiles</h3>
          <p className="text-muted-foreground">Check back later for new people to meet!</p>
          <Button onClick={() => setCurrentIndex(0)} className="mt-4">
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background">
      {/* Mode Toggle */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border p-4">
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={mode === 'friends' ? 'default' : 'ghost'}
            className="flex-1 text-sm"
            onClick={() => setMode('friends')}
          >
            Make Friends
          </Button>
          <Button
            variant={mode === 'dating' ? 'default' : 'ghost'}
            className="flex-1 text-sm"
            onClick={() => setMode('dating')}
          >
            Dating
          </Button>
        </div>
      </div>

      {/* Card Stack Container */}
      <div className="relative h-[calc(100vh-200px)] p-4">
        {/* Background Cards */}
        {profiles.slice(currentIndex + 1, currentIndex + 3).map((profile, index) => (
          <Card 
            key={profile.id}
            className={`absolute inset-0 bg-card rounded-2xl shadow-lg transition-all duration-300`}
            style={{
              transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * 8}px)`,
              zIndex: 10 - index
            }}
          />
        ))}

        {/* Main Profile Card */}
        <Card className="swipe-card" style={{ zIndex: 20 }}>
          {/* Profile Image */}
          <div className="relative h-2/3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-primary/30">
                {currentProfile.name.charAt(0)}
              </div>
            </div>
            
            {/* Online Indicator */}
            {currentProfile.isOnline && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-social-online rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-medium">Online</span>
                </div>
              </div>
            )}

            {/* Photo Dots */}
            <div className="absolute top-4 left-4 flex space-x-2">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <span>{currentProfile.name}, {currentProfile.age}</span>
                </h2>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{currentProfile.distance}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-primary">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>{currentProfile.year} {currentProfile.program}</span>
              <span>•</span>
              <span>{currentProfile.tower} Tower, Floor {currentProfile.floor}</span>
            </div>

            <p className="text-sm leading-relaxed">{currentProfile.bio}</p>

            <div className="flex flex-wrap gap-2">
              {currentProfile.interests.slice(0, 4).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {currentProfile.interests.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{currentProfile.interests.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200"
            onClick={() => handleSwipe('left')}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200"
            onClick={handleSuperLike}
          >
            <Star className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full border-2 hover:bg-social-like hover:text-white hover:border-social-like transition-all duration-200"
            onClick={() => handleSwipe('right')}
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};