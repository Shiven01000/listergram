import { useState } from "react";
import { Settings, Edit, Grid, Bookmark, Heart, MessageCircle, Share, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/listergram-hero.jpg";
import listerTowers from "@/assets/lister-towers.jpg";

const mockPosts = [
  { id: "1", image: heroImage, likes: 42, comments: 8 },
  { id: "2", image: listerTowers, likes: 67, comments: 12 },
  { id: "3", image: heroImage, likes: 28, comments: 5 },
  { id: "4", image: listerTowers, likes: 51, comments: 9 },
  { id: "5", image: heroImage, likes: 35, comments: 7 },
  { id: "6", image: listerTowers, likes: 43, comments: 6 },
];

export const ProfileScreen = () => {
  const { user } = useAuth();
  const { profile, loading } = useProfile();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  if (loading) {
    return (
      <div className="w-full bg-background p-6 space-y-6">
        <div className="flex items-start space-x-6">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex space-x-6">
              <div className="text-center space-y-1">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="text-center space-y-1">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="text-center space-y-1">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full bg-background p-6 text-center">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background">
      {/* Profile Header */}
      <div className="p-6 space-y-6">
        {/* Avatar and Stats */}
        <div className="flex items-start space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.profile_pic_url || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
              {profile.full_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{profile.full_name}</h1>
                <p className="text-muted-foreground">@{profile.username}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="font-semibold text-lg">12</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">84</p>
                <p className="text-xs text-muted-foreground">Friends</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">5</p>
                <p className="text-xs text-muted-foreground">Events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Details */}
        <div className="space-y-3">
          {profile.bio && (
            <p className="text-sm leading-relaxed">{profile.bio}</p>
          )}
          
          {/* Lister Details */}
          <div className="flex flex-wrap gap-2">
            {profile.lister_role !== 'Common Resident' && (
              <Badge className="bg-lister-gold text-lister-gold-foreground">
                {profile.lister_role}
                {profile.role_verified && " ✓"}
              </Badge>
            )}
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {profile.tower} Tower • Floor {profile.floor}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {profile.year_of_study} {profile.program}
            </Badge>
          </div>

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profile.interests.slice(0, 4).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {profile.interests.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{profile.interests.length - 4} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline" size="icon">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Content Tabs */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 flex items-center justify-center py-4 transition-colors ${
              activeTab === 'posts'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Grid className="h-5 w-5 mr-2" />
            Posts
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 flex items-center justify-center py-4 transition-colors ${
              activeTab === 'saved'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground'
            }`}
          >
            <Bookmark className="h-5 w-5 mr-2" />
            Saved
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="p-1">
        {activeTab === 'posts' && (
          <div className="text-center py-20">
            <Grid className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Share your first Lister moment!
            </p>
            <Button size="sm">Create Post</Button>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="flex flex-col items-center justify-center py-20">
            <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No saved posts yet</h3>
            <p className="text-muted-foreground text-center">
              Posts you save will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};