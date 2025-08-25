import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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
];

export default function MessagesScreen() {
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

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity className="flex-row items-center px-4 py-4 border-b border-gray-100">
      {/* Avatar with Online Status */}
      <View className="relative">
        <View className="w-14 h-14 rounded-full bg-primary items-center justify-center">
          <Text className="text-white font-semibold">
            {item.user.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        {item.user.isOnline && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-social-online border-2 border-white rounded-full" />
        )}
        {item.isMatch && (
          <View className="absolute -top-1 -right-1">
            <View className={`w-6 h-6 rounded-full items-center justify-center ${
              item.matchType === 'dating' ? 'bg-social-like' : 'bg-primary'
            }`}>
              {item.matchType === 'dating' ? (
                <Ionicons name="heart" size={12} color="white" />
              ) : (
                <Ionicons name="chatbubble" size={12} color="white" />
              )}
            </View>
          </View>
        )}
      </View>

      {/* Message Content */}
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row items-center">
            <Text className={`font-medium ${item.unreadCount > 0 ? 'font-semibold' : ''}`}>
              {item.user.name}
            </Text>
            <Text className="text-xs text-gray-500 ml-2">{item.user.tower}</Text>
            {item.isMatch && (
              <View className={`ml-2 px-2 py-0.5 rounded-full ${
                item.matchType === 'dating' 
                  ? 'bg-red-100' 
                  : 'bg-primary/10'
              }`}>
                <Text className={`text-xs font-medium ${
                  item.matchType === 'dating' ? 'text-red-600' : 'text-primary'
                }`}>
                  {item.matchType === 'dating' ? 'Match' : 'Friend'}
                </Text>
              </View>
            )}
          </View>
          <View className="flex-row items-center">
            <Text className="text-xs text-gray-500">{item.timestamp}</Text>
            {item.unreadCount > 0 && (
              <View className="bg-social-notification rounded-full w-5 h-5 items-center justify-center ml-2">
                <Text className="text-white text-xs font-medium">{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
        <Text className={`text-sm text-gray-600 ${
          item.unreadCount > 0 ? 'font-medium text-gray-900' : ''
        }`} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold">Messages</Text>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View className="relative mb-4">
          <Ionicons name="search" size={20} color="#64748b" className="absolute left-3 top-3 z-10" />
          <TextInput
            placeholder="Search messages..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="bg-gray-100 rounded-lg pl-10 pr-4 py-3 text-base"
          />
        </View>

        {/* Filter Tabs */}
        <View className="flex-row bg-gray-100 rounded-lg p-1">
          <TouchableOpacity
            onPress={() => setActiveFilter('all')}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeFilter === 'all' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text className={`text-center text-sm font-medium ${
              activeFilter === 'all' ? 'text-gray-900' : 'text-gray-600'
            }`}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveFilter('matches')}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeFilter === 'matches' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text className={`text-center text-sm font-medium ${
              activeFilter === 'matches' ? 'text-gray-900' : 'text-gray-600'
            }`}>
              Matches
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveFilter('unread')}
            className={`flex-1 py-2 px-4 rounded-md relative ${
              activeFilter === 'unread' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text className={`text-center text-sm font-medium ${
              activeFilter === 'unread' ? 'text-gray-900' : 'text-gray-600'
            }`}>
              Unread
            </Text>
            {totalUnread > 0 && (
              <View className="absolute -top-1 -right-1 bg-social-notification rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-medium">{totalUnread}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="chatbubble-outline" size={64} color="#64748b" />
            <Text className="text-xl font-semibold text-gray-600 mt-4">No messages found</Text>
            <Text className="text-sm text-gray-500 mt-1 text-center">
              {searchQuery ? 'Try adjusting your search' : 'Start connecting with people to see your messages here'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}