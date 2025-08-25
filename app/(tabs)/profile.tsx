import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, Edit, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Profile
        </Text>
        <TouchableOpacity>
          <Settings size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center mb-4">
              <Text className="text-2xl font-bold text-primary-600">
                {profile?.full_name?.charAt(0) || 'U'}
              </Text>
            </View>
            <Text className="text-xl font-bold text-gray-900">
              {profile?.full_name}
            </Text>
            <Text className="text-gray-600">
              @{profile?.username}
            </Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-4 mb-6">
            <Text className="font-semibold text-gray-900 mb-3">
              Residence Info
            </Text>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Tower:</Text>
                <Text className="text-gray-900 font-medium">{profile?.tower}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Floor:</Text>
                <Text className="text-gray-900 font-medium">{profile?.floor}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Program:</Text>
                <Text className="text-gray-900 font-medium">{profile?.program}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Year:</Text>
                <Text className="text-gray-900 font-medium">{profile?.year_of_study}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Role:</Text>
                <Text className="text-gray-900 font-medium">{profile?.lister_role}</Text>
              </View>
            </View>
          </View>

          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
              <View className="flex-row items-center">
                <Edit size={20} color="#374151" />
                <Text className="text-gray-900 font-medium ml-3">
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleSignOut}
              className="flex-row items-center justify-between bg-white border border-red-200 rounded-lg p-4"
            >
              <View className="flex-row items-center">
                <LogOut size={20} color="#dc2626" />
                <Text className="text-red-600 font-medium ml-3">
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}