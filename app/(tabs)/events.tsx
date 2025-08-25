import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Calendar, MapPin, Users } from 'lucide-react-native';

export default function EventsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Events
        </Text>
        <TouchableOpacity className="bg-primary-600 rounded-full p-2">
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="bg-primary-50 rounded-lg p-4 mb-6">
            <Text className="text-primary-800 font-semibold mb-2">
              📅 Upcoming Events
            </Text>
            <Text className="text-primary-700">
              Stay connected with your Lister community through events, study sessions, and social gatherings.
            </Text>
          </View>

          <View className="space-y-4">
            <View className="bg-white rounded-lg border border-gray-200 p-4">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 text-lg">
                    Floor Meeting - Henday 5th
                  </Text>
                  <Text className="text-gray-600 mt-1">
                    Monthly floor meeting to discuss upcoming events
                  </Text>
                </View>
              </View>
              
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <Calendar size={16} color="#6b7280" />
                  <Text className="text-gray-600 ml-2">Today, 7:00 PM</Text>
                </View>
                <View className="flex-row items-center">
                  <MapPin size={16} color="#6b7280" />
                  <Text className="text-gray-600 ml-2">Henday 5th Floor Lounge</Text>
                </View>
                <View className="flex-row items-center">
                  <Users size={16} color="#6b7280" />
                  <Text className="text-gray-600 ml-2">12 attending</Text>
                </View>
              </View>

              <TouchableOpacity className="bg-primary-600 rounded-lg py-3 mt-4">
                <Text className="text-white font-semibold text-center">
                  Join Event
                </Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white rounded-lg border border-gray-200 p-4">
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 text-lg">
                    Study Session - CMPUT 272
                  </Text>
                  <Text className="text-gray-600 mt-1">
                    Group study for upcoming midterm
                  </Text>
                </View>
              </View>
              
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <Calendar size={16} color="#6b7280" />
                  <Text className="text-gray-600 ml-2">Tomorrow, 2:00 PM</Text>
                </View>
                <View className="flex-row items-center">
                  <MapPin size={16} color="#6b7280" />
                  <Text className="text-gray-600 ml-2">Mackenzie Study Room</Text>
                </View>
                <View className="flex-row items-center">
                  <Users size={16} color="#6b7280" />
                  <Text className="text-gray-600 ml-2">8 attending</Text>
                </View>
              </View>

              <TouchableOpacity className="bg-primary-600 rounded-lg py-3 mt-4">
                <Text className="text-white font-semibold text-center">
                  Join Event
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}