import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReelsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl font-semibold">
          Reels Coming Soon
        </Text>
        <Text className="text-white/70 text-center mt-2 px-8">
          Short-form videos from your Lister community will appear here
        </Text>
      </View>
    </SafeAreaView>
  );
}