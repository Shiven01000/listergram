import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { profile, loading } = useProfile();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-6 space-y-6">
          <View className="flex-row items-start space-x-6">
            <View className="w-20 h-20 rounded-full bg-gray-200" />
            <View className="flex-1 space-y-3">
              <View className="space-y-2">
                <View className="h-6 w-32 bg-gray-200 rounded" />
                <View className="h-4 w-24 bg-gray-200 rounded" />
              </View>
              <View className="flex-row space-x-6">
                {[1, 2, 3].map((i) => (
                  <View key={i} className="items-center space-y-1">
                    <View className="h-6 w-8 bg-gray-200 rounded" />
                    <View className="h-3 w-12 bg-gray-200 rounded" />
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View className="space-y-3">
            <View className="h-4 w-full bg-gray-200 rounded" />
            <View className="h-4 w-3/4 bg-gray-200 rounded" />
            <View className="flex-row flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <View key={i} className="h-6 w-20 bg-gray-200 rounded" />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Profile not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="p-6 space-y-6">
          {/* Avatar and Stats */}
          <View className="flex-row items-start space-x-6">
            <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
              <Text className="text-white text-xl font-semibold">
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>

            <View className="flex-1 space-y-3">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-xl font-bold">{profile.full_name}</Text>
                  <Text className="text-gray-500">@{profile.username}</Text>
                </View>
                <TouchableOpacity onPress={signOut}>
                  <Ionicons name="settings-outline" size={24} color="#64748b" />
                </TouchableOpacity>
              </View>

              {/* Stats */}
              <View className="flex-row space-x-6">
                <View className="items-center">
                  <Text className="font-semibold text-lg">12</Text>
                  <Text className="text-xs text-gray-500">Posts</Text>
                </View>
                <View className="items-center">
                  <Text className="font-semibold text-lg">84</Text>
                  <Text className="text-xs text-gray-500">Friends</Text>
                </View>
                <View className="items-center">
                  <Text className="font-semibold text-lg">5</Text>
                  <Text className="text-xs text-gray-500">Events</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bio and Details */}
          <View className="space-y-3">
            {profile.bio && (
              <Text className="text-sm leading-relaxed">{profile.bio}</Text>
            )}
            
            {/* Lister Details */}
            <View className="flex-row flex-wrap gap-2">
              {profile.lister_role !== 'Common Resident' && (
                <View className="bg-lister-gold/10 px-3 py-1 rounded-full flex-row items-center">
                  <Text className="text-lister-gold text-xs font-medium">
                    {profile.lister_role}
                    {profile.role_verified && " ✓"}
                  </Text>
                </View>
              )}
              <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
                <Ionicons name="location-outline" size={12} color="#64748b" />
                <Text className="text-gray-600 text-xs ml-1">
                  {profile.tower} Tower • Floor {profile.floor}
                </Text>
              </View>
              <View className="bg-gray-100 px-3 py-1 rounded-full flex-row items-center">
                <Ionicons name="school-outline" size={12} color="#64748b" />
                <Text className="text-gray-600 text-xs ml-1">
                  {profile.year_of_study} {profile.program}
                </Text>
              </View>
            </View>

            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <View className="flex-row flex-wrap gap-2">
                {profile.interests.slice(0, 4).map((interest) => (
                  <View key={interest} className="bg-secondary px-3 py-1 rounded-full">
                    <Text className="text-xs text-gray-700">{interest}</Text>
                  </View>
                ))}
                {profile.interests.length > 4 && (
                  <View className="bg-gray-100 px-3 py-1 rounded-full">
                    <Text className="text-xs text-gray-600">
                      +{profile.interests.length - 4} more
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-1 bg-primary rounded-lg py-3 flex-row items-center justify-center">
              <Ionicons name="create-outline" size={16} color="white" />
              <Text className="text-white font-semibold ml-2">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 rounded-lg py-3 px-4">
              <Ionicons name="share-outline" size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Separator */}
        <View className="h-px bg-gray-200" />

        {/* Content Tabs */}
        <View className="flex-row bg-white border-b border-gray-200">
          <TouchableOpacity
            onPress={() => setActiveTab('posts')}
            className={`flex-1 flex-row items-center justify-center py-4 ${
              activeTab === 'posts' ? 'border-b-2 border-primary' : ''
            }`}
          >
            <Ionicons 
              name="grid-outline" 
              size={20} 
              color={activeTab === 'posts' ? '#158b4b' : '#64748b'} 
            />
            <Text className={`ml-2 font-medium ${
              activeTab === 'posts' ? 'text-primary' : 'text-gray-500'
            }`}>
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('saved')}
            className={`flex-1 flex-row items-center justify-center py-4 ${
              activeTab === 'saved' ? 'border-b-2 border-primary' : ''
            }`}
          >
            <Ionicons 
              name="bookmark-outline" 
              size={20} 
              color={activeTab === 'saved' ? '#158b4b' : '#64748b'} 
            />
            <Text className={`ml-2 font-medium ${
              activeTab === 'saved' ? 'text-primary' : 'text-gray-500'
            }`}>
              Saved
            </Text>
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <View className="p-1">
          {activeTab === 'posts' && (
            <View className="items-center py-20">
              <Ionicons name="grid-outline" size={64} color="#64748b" />
              <Text className="text-xl font-semibold text-gray-600 mt-4">No posts yet</Text>
              <Text className="text-gray-500 text-center mt-2 mb-4">
                Share your first Lister moment!
              </Text>
              <TouchableOpacity className="bg-primary px-6 py-3 rounded-lg">
                <Text className="text-white font-semibold">Create Post</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'saved' && (
            <View className="items-center py-20">
              <Ionicons name="bookmark-outline" size={64} color="#64748b" />
              <Text className="text-xl font-semibold text-gray-600 mt-4">No saved posts yet</Text>
              <Text className="text-gray-500 text-center mt-2">
                Posts you save will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}