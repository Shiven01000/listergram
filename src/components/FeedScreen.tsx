import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import heroImage from "@/assets/listergram-hero.jpg";
import listerTowers from "@/assets/lister-towers.jpg";

interface Post {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    tower: string;
    floor: number;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      username: "sarahc_uofa",
      avatar: "",
      tower: "Henday",
      floor: 7,
    },
    image: heroImage,
    caption: "Late night study session with the floor fam! 📚 Only at Lister do you find this level of community support 💚 #ListerLife #StudyGroup #HendayTower",
    likes: 42,
    comments: 8,
    timestamp: "2h",
    isLiked: false,
  },
  {
    id: "2",
    user: {
      name: "Marcus Johnson",
      username: "marcus.j",
      avatar: "",
      tower: "Mackenzie",
      floor: 12,
    },
    image: listerTowers,
    caption: "Golden hour hits different when you're looking out from Mack 12! 🌅 Home sweet home #ListerSunset #MackenzieLife #UofALife",
    likes: 67,
    comments: 12,
    timestamp: "4h",
    isLiked: true,
  },
];

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
}

const mockStories: StoryUser[] = [
  { id: "1", name: "Your Story", avatar: "", hasStory: false, isViewed: false },
  { id: "2", name: "Alex M.", avatar: "", hasStory: true, isViewed: false },
  { id: "3", name: "Emma K.", avatar: "", hasStory: true, isViewed: true },
  { id: "4", name: "Jake P.", avatar: "", hasStory: true, isViewed: false },
  { id: "5", name: "Maya S.", avatar: "", hasStory: true, isViewed: true },
];

export const FeedScreen = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  return (
    <div className="w-full bg-background">
      {/* Stories Section */}
      <div className="border-b border-border p-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {mockStories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div className={`story-ring ${story.hasStory && !story.isViewed ? 'opacity-100' : story.isViewed ? 'opacity-60' : ''}`}>
                <Avatar className="story-avatar">
                  <AvatarImage src={story.avatar} />
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
                    {story.name === "Your Story" ? (
                      <Camera className="h-6 w-6" />
                    ) : (
                      story.name.charAt(0)
                    )}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-muted-foreground font-medium max-w-[60px] truncate">
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <div key={post.id} className="bg-background animate-slide-up">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4 pb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {post.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{post.user.username}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {post.user.tower} Tower, Floor {post.user.floor}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            {/* Post Image */}
            <div className="relative aspect-post bg-muted">
              <img 
                src={post.image} 
                alt="Post content"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`like-button ${post.isLiked ? 'liked text-social-like' : ''}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`h-6 w-6 ${post.isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Send className="h-6 w-6" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-6 w-6" />
                </Button>
              </div>

              {/* Post Stats */}
              <div className="space-y-1">
                <p className="font-semibold text-sm">
                  {post.likes} likes
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{post.user.username}</span>{' '}
                  {post.caption}
                </p>
                {post.comments > 0 && (
                  <p className="text-sm text-muted-foreground">
                    View all {post.comments} comments
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};