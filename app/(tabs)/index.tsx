import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Search, MessageCircle } from 'lucide-react-native';

export default function HomeScreen() {
  const { profile } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold text-primary-600">
          Listergram
        </Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity>
            <Plus size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MessageCircle size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Welcome back, {profile?.full_name}!
          </Text>
          <Text className="text-gray-600 mb-4">
            {profile?.tower} Tower, Floor {profile?.floor}
          </Text>
          
          <View className="bg-primary-50 rounded-lg p-4 mb-6">
            <Text className="text-primary-800 font-semibold mb-2">
              🎉 Welcome to Listergram!
            </Text>
            <Text className="text-primary-700">
              Start connecting with your Lister neighbors. Share your experiences, join events, and make new friends!
            </Text>
          </View>

          <View className="space-y-4">
            <View className="bg-gray-50 rounded-lg p-4">
              <Text className="font-semibold text-gray-900 mb-2">
                Quick Actions
              </Text>
              <View className="space-y-2">
                <TouchableOpacity className="bg-white rounded-lg p-3 border border-gray-200">
                  <Text className="text-gray-800">📸 Share your first post</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-lg p-3 border border-gray-200">
                  <Text className="text-gray-800">👥 Find study partners</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-lg p-3 border border-gray-200">
                  <Text className="text-gray-800">🎯 Join upcoming events</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}