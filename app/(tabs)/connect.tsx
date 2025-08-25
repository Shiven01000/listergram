import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConnectScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-8">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Connect & Match
        </Text>
        <Text className="text-gray-600 text-center">
          Find study partners, make friends, and connect with your Lister community. Coming soon!
        </Text>
      </View>
    </SafeAreaView>
  );
}