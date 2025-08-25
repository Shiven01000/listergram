import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
}

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

const mockStories: StoryUser[] = [
  { id: "1", name: "Your Story", avatar: "", hasStory: false, isViewed: false },
  { id: "2", name: "Alex M.", avatar: "", hasStory: true, isViewed: false },
  { id: "3", name: "Emma K.", avatar: "", hasStory: true, isViewed: true },
  { id: "4", name: "Jake P.", avatar: "", hasStory: true, isViewed: false },
  { id: "5", name: "Maya S.", avatar: "", hasStory: true, isViewed: true },
];

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
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Golden hour hits different when you're looking out from Mack 12! 🌅 Home sweet home #ListerSunset #MackenzieLife #UofALife",
    likes: 67,
    comments: 12,
    timestamp: "4h",
    isLiked: true,
  },
];

export default function FeedScreen() {
  const { signOut } = useAuth();
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

  const renderStoryItem = ({ item }: { item: StoryUser }) => (
    <TouchableOpacity className="items-center mr-4">
      <View className={`w-16 h-16 rounded-full p-0.5 ${
        item.hasStory && !item.isViewed 
          ? 'bg-gradient-to-r from-lister-gold to-accent-light' 
          : item.isViewed 
          ? 'bg-gray-300' 
          : 'bg-gray-200'
      }`}>
        <View className="w-full h-full rounded-full bg-white items-center justify-center">
          {item.name === "Your Story" ? (
            <Ionicons name="camera" size={24} color="#64748b" />
          ) : (
            <Text className="text-lg font-semibold text-primary">
              {item.name.charAt(0)}
            </Text>
          )}
        </View>
      </View>
      <Text className="text-xs text-gray-600 mt-1 max-w-[60px] text-center" numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: Post }) => (
    <View className="bg-white mb-4">
      {/* Post Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
            <Text className="text-white font-semibold text-sm">
              {item.user.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View className="ml-3">
            <View className="flex-row items-center">
              <Text className="font-semibold text-sm">{item.user.username}</Text>
              <Text className="text-gray-500 text-xs ml-2">• {item.timestamp}</Text>
            </View>
            <Text className="text-xs text-gray-500">
              {item.user.tower} Tower, Floor {item.user.floor}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image 
        source={{ uri: item.image }}
        className="w-full aspect-square"
        resizeMode="cover"
      />

      {/* Post Actions */}
      <View className="px-4 py-3">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => handleLike(item.id)}>
              <Ionicons 
                name={item.isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={item.isLiked ? "#ef4444" : "#64748b"} 
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={24} color="#64748b" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="paper-plane-outline" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Post Stats */}
        <Text className="font-semibold text-sm mb-1">
          {item.likes} likes
        </Text>
        <Text className="text-sm">
          <Text className="font-semibold">{item.user.username}</Text>
          <Text className="text-gray-800"> {item.caption}</Text>
        </Text>
        {item.comments > 0 && (
          <Text className="text-sm text-gray-500 mt-1">
            View all {item.comments} comments
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <Text className="text-xl font-bold text-primary">Listergram</Text>
        <TouchableOpacity onPress={signOut}>
          <Ionicons name="log-out-outline" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="border-b border-gray-200 py-4">
            <FlatList
              data={mockStories}
              renderItem={renderStoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}