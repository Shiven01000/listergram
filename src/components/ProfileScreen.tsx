import { useState } from "react";
import { Settings, Edit, Grid, Bookmark, Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import heroImage from "@/assets/listergram-hero.jpg";
import listerTowers from "@/assets/lister-towers.jpg";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  tower: string;
  floor: number;
  program: string;
  year: string;
  role: string;
  followers: number;
  following: number;
  posts: number;
  interests: string[];
}

const mockUser: UserProfile = {
  name: "Sarah Chen",
  username: "sarahc_uofa",
  bio: "3rd year Engineering student 👩‍💻 Floor Captain @ Henday 7 🏠 Coffee addict ☕ Always down for study sessions and late-night convos! #ListerLife",
  avatar: "",
  tower: "Henday",
  floor: 7,
  program: "Computer Engineering",
  year: "3rd Year",
  role: "Floor Captain",
  followers: 234,
  following: 189,
  posts: 47,
  interests: ["Coffee", "Coding", "Photography", "Study Groups", "Hiking", "Movies"]
};

const mockPosts = [
  { id: "1", image: heroImage, likes: 42, comments: 8 },
  { id: "2", image: listerTowers, likes: 67, comments: 12 },
  { id: "3", image: heroImage, likes: 28, comments: 5 },
  { id: "4", image: listerTowers, likes: 51, comments: 9 },
  { id: "5", image: heroImage, likes: 35, comments: 7 },
  { id: "6", image: listerTowers, likes: 43, comments: 6 },
];

export const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  return (
    <div className="w-full bg-background">
      {/* Profile Header */}
      <div className="p-6 space-y-6">
        {/* Avatar and Stats */}
        <div className="flex items-start space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={mockUser.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
              SC
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{mockUser.name}</h1>
                <p className="text-muted-foreground">@{mockUser.username}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="font-semibold text-lg">{mockUser.posts}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">{mockUser.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">{mockUser.following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio and Details */}
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{mockUser.bio}</p>
          
          {/* Lister Details */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {mockUser.role}
            </Badge>
            <Badge variant="outline">
              {mockUser.tower} Tower • Floor {mockUser.floor}
            </Badge>
            <Badge variant="outline">
              {mockUser.year} {mockUser.program}
            </Badge>
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-2">
            {mockUser.interests.slice(0, 4).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {mockUser.interests.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{mockUser.interests.length - 4} more
              </Badge>
            )}
          </div>
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
          <div className="grid grid-cols-3 gap-1">
            {mockPosts.map((post) => (
              <div key={post.id} className="relative aspect-square bg-muted group cursor-pointer">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-5 w-5 fill-current" />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-5 w-5 fill-current" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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