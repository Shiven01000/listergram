import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanGestureHandler,
  State,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Profile {
  id: string;
  name: string;
  age: number;
  tower: string;
  floor: number;
  program: string;
  year: string;
  bio: string;
  interests: string[];
  photos: string[];
  distance: string;
  isOnline: boolean;
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Emma",
    age: 20,
    tower: "Mackenzie",
    floor: 8,
    program: "Engineering",
    year: "2nd Year",
    bio: "Coffee enthusiast ☕ Love exploring Edmonton and trying new restaurants! Always down for study dates or weekend adventures 🌟",
    interests: ["Coffee", "Hiking", "Photography", "Study Groups", "Movies"],
    photos: [""],
    distance: "2 floors away",
    isOnline: true
  },
  {
    id: "2", 
    name: "Alex",
    age: 21,
    tower: "Henday",
    floor: 12,
    program: "Business",
    year: "3rd Year",
    bio: "Gym enthusiast 💪 Business student who loves networking and meeting new people. Let's grab lunch at the caf sometime!",
    interests: ["Fitness", "Business", "Networking", "Basketball", "Travel"],
    photos: [""],
    distance: "Different tower",
    isOnline: false
  },
  {
    id: "3",
    name: "Maya",
    age: 19,
    tower: "Schaffer",
    floor: 5,
    program: "Arts",
    year: "1st Year",
    bio: "Artist at heart 🎨 New to Lister and looking to make friends! Love painting, music, and deep conversations over late night snacks.",
    interests: ["Art", "Music", "Books", "Painting", "Philosophy"],
    photos: [""],
    distance: "Different tower",
    isOnline: true
  }
];

export default function ConnectScreen() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<'dating' | 'friends'>('friends');
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    const toValue = direction === 'right' ? width : -width;
    
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      translateX.setValue(0);
      translateY.setValue(0);
    });
  };

  const handleSuperLike = () => {
    Animated.timing(translateY, {
      toValue: -height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      translateX.setValue(0);
      translateY.setValue(0);
    });
  };

  if (!currentProfile) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Ionicons name="heart-outline" size={64} color="#64748b" />
        <Text className="text-xl font-semibold mt-4">No more profiles</Text>
        <Text className="text-gray-500 mt-2">Check back later for new people to meet!</Text>
        <TouchableOpacity 
          onPress={() => setCurrentIndex(0)}
          className="bg-primary px-6 py-3 rounded-lg mt-4"
        >
          <Text className="text-white font-semibold">Start Over</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Mode Toggle */}
      <View className="px-4 py-4 border-b border-gray-200">
        <View className="flex-row bg-gray-100 rounded-lg p-1">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md ${mode === 'friends' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setMode('friends')}
          >
            <Text className={`text-center font-medium ${mode === 'friends' ? 'text-gray-900' : 'text-gray-600'}`}>
              Make Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-md ${mode === 'dating' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setMode('dating')}
          >
            <Text className={`text-center font-medium ${mode === 'dating' ? 'text-gray-900' : 'text-gray-600'}`}>
              Dating
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Stack Container */}
      <View className="flex-1 p-4">
        {/* Background Cards */}
        {profiles.slice(currentIndex + 1, currentIndex + 3).map((profile, index) => (
          <View 
            key={profile.id}
            className="absolute inset-0 bg-white rounded-2xl shadow-lg"
            style={{
              transform: [
                { scale: 1 - (index + 1) * 0.05 },
                { translateY: (index + 1) * 8 }
              ],
              zIndex: 10 - index
            }}
          />
        ))}

        {/* Main Profile Card */}
        <Animated.View
          className="absolute inset-0 bg-white rounded-2xl shadow-lg"
          style={{
            transform: [
              { translateX },
              { translateY }
            ],
            zIndex: 20
          }}
        >
          {/* Profile Image */}
          <View className="h-2/3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-2xl items-center justify-center relative">
            <Text className="text-6xl font-bold text-primary/30">
              {currentProfile.name.charAt(0)}
            </Text>
            
            {/* Online Indicator */}
            {currentProfile.isOnline && (
              <View className="absolute top-4 right-4 flex-row items-center bg-black/50 rounded-full px-3 py-1">
                <View className="w-2 h-2 bg-social-online rounded-full mr-2" />
                <Text className="text-white text-xs font-medium">Online</Text>
              </View>
            )}

            {/* Photo Dots */}
            <View className="absolute top-4 left-4 flex-row space-x-2">
              {[1, 2, 3].map((_, i) => (
                <View key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </View>
          </View>

          {/* Profile Info */}
          <View className="p-6 flex-1">
            <View className="flex-row items-center justify-between mb-2">
              <View>
                <Text className="text-2xl font-bold">
                  {currentProfile.name}, {currentProfile.age}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="location-outline" size={16} color="#64748b" />
                  <Text className="text-sm text-gray-500 ml-1">{currentProfile.distance}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={24} color="#158b4b" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-3">
              <Ionicons name="school-outline" size={16} color="#64748b" />
              <Text className="text-sm text-gray-500 ml-2">
                {currentProfile.year} {currentProfile.program}
              </Text>
              <Text className="text-sm text-gray-500 mx-2">•</Text>
              <Text className="text-sm text-gray-500">
                {currentProfile.tower} Tower, Floor {currentProfile.floor}
              </Text>
            </View>

            <Text className="text-sm leading-relaxed mb-4">{currentProfile.bio}</Text>

            <View className="flex-row flex-wrap">
              {currentProfile.interests.slice(0, 4).map((interest) => (
                <View key={interest} className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
                  <Text className="text-xs text-gray-700">{interest}</Text>
                </View>
              ))}
              {currentProfile.interests.length > 4 && (
                <View className="bg-gray-100 px-3 py-1 rounded-full">
                  <Text className="text-xs text-gray-700">
                    +{currentProfile.interests.length - 4} more
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <View className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-row items-center space-x-4" style={{ marginLeft: -80 }}>
          <TouchableOpacity
            onPress={() => handleSwipe('left')}
            className="w-14 h-14 bg-white rounded-full border-2 border-red-200 items-center justify-center shadow-lg"
          >
            <Ionicons name="close" size={24} color="#ef4444" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSuperLike}
            className="w-12 h-12 bg-white rounded-full border-2 border-blue-200 items-center justify-center shadow-lg"
          >
            <Ionicons name="star" size={20} color="#3b82f6" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSwipe('right')}
            className="w-14 h-14 bg-white rounded-full border-2 border-green-200 items-center justify-center shadow-lg"
          >
            <Ionicons name="heart" size={24} color="#22c55e" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}