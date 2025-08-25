import { useState } from "react";
import { Search, Edit, Circle, MessageCircle, Camera, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    tower: string;
    isOnline: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isMatch: boolean;
  matchType?: 'dating' | 'friends';
}

const mockMessages: Message[] = [
  {
    id: "1",
    user: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "",
      tower: "Mackenzie",
      isOnline: true
    },
    lastMessage: "Hey! Want to grab coffee at the caf tomorrow? ☕",
    timestamp: "2m ago",
    unreadCount: 2,
    isMatch: true,
    matchType: "friends"
  },
  {
    id: "2",
    user: {
      name: "Marcus Johnson",
      username: "marcus.j",
      avatar: "",
      tower: "Mackenzie",
      isOnline: false
    },
    lastMessage: "Thanks for coming to the karaoke night! Had so much fun 🎤",
    timestamp: "1h ago",
    unreadCount: 0,
    isMatch: false
  },
  {
    id: "3",
    user: {
      name: "Alex Kim",
      username: "alexk_eng",
      avatar: "",
      tower: "Henday",
      isOnline: true
    },
    lastMessage: "You: Study session was productive! Same time tomorrow?",
    timestamp: "3h ago",
    unreadCount: 0,
    isMatch: true,
    matchType: "dating"
  },
  {
    id: "4",
    user: {
      name: "Maya Singh",
      username: "mayaarts",
      avatar: "",
      tower: "Schaffer",
      isOnline: false
    },
    lastMessage: "Love your latest post! The photography is amazing 📸",
    timestamp: "1d ago",
    unreadCount: 1,
    isMatch: false
  },
  {
    id: "5",
    user: {
      name: "Jake Peterson",
      username: "jake_p",
      avatar: "",
      tower: "Kelsey",
      isOnline: true
    },
    lastMessage: "You: See you at the gym later! 💪",
    timestamp: "2d ago",
    unreadCount: 0,
    isMatch: true,
    matchType: "friends"
  }
];

export const MessagesScreen = () => {
  const [messages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'matches' | 'unread'>('all');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'matches' && message.isMatch) ||
                         (activeFilter === 'unread' && message.unreadCount > 0);
    
    return matchesSearch && matchesFilter;
  });

  const totalUnread = messages.reduce((sum, msg) => sum + msg.unreadCount, 0);

  return (
    <div className="w-full bg-background">
      {/* Header with Search */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Messages</h2>
          <Button variant="ghost" size="icon">
            <Edit className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 text-sm py-2 px-4 rounded-md transition-colors ${
              activeFilter === 'all'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('matches')}
            className={`flex-1 text-sm py-2 px-4 rounded-md transition-colors ${
              activeFilter === 'matches'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Matches
          </button>
          <button
            onClick={() => setActiveFilter('unread')}
            className={`flex-1 text-sm py-2 px-4 rounded-md transition-colors relative ${
              activeFilter === 'unread'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Unread
            {totalUnread > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-social-notification text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center p-0">
                {totalUnread}
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="divide-y divide-border">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer animate-slide-up"
          >
            {/* Avatar with Online Status */}
            <div className="relative">
              <Avatar className="w-14 h-14">
                <AvatarImage src={message.user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {message.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {message.user.isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-social-online border-2 border-background rounded-full" />
              )}
              {message.isMatch && (
                <div className="absolute -top-1 -right-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.matchType === 'dating' ? 'bg-social-like' : 'bg-primary'
                  }`}>
                    {message.matchType === 'dating' ? (
                      <Heart className="h-3 w-3 text-white fill-current" />
                    ) : (
                      <MessageCircle className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <h3 className={`font-medium truncate ${
                    message.unreadCount > 0 ? 'font-semibold' : ''
                  }`}>
                    {message.user.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {message.user.tower}
                  </span>
                  {message.isMatch && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        message.matchType === 'dating' 
                          ? 'bg-social-like/10 text-social-like' 
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {message.matchType === 'dating' ? 'Match' : 'Friend'}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp}
                  </span>
                  {message.unreadCount > 0 && (
                    <Badge className="bg-social-notification text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center p-0">
                      {message.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
              <p className={`text-sm text-muted-foreground truncate ${
                message.unreadCount > 0 ? 'font-medium text-foreground' : ''
              }`}>
                {message.lastMessage}
              </p>
            </div>
          </div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="text-center py-20">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No messages found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try adjusting your search' : 'Start connecting with people to see your messages here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};