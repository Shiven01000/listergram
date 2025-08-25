import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#158b4b', '#0f7a3f']}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center px-8">
          <View className="items-center mb-12">
            <Text className="text-6xl font-bold text-white mb-4">
              Listergram
            </Text>
            <Text className="text-xl text-white/90 text-center mb-2">
              Lister Hall Community
            </Text>
            <Text className="text-base text-white/80 text-center">
              Connect, Share, and Discover with your Lister neighbors
            </Text>
          </View>

          <View className="w-full space-y-4">
            <TouchableOpacity
              onPress={() => router.push('/(auth)/signup')}
              className="bg-white rounded-full py-4 px-8"
            >
              <Text className="text-primary-600 text-lg font-semibold text-center">
                Create Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(auth)/login')}
              className="border-2 border-white rounded-full py-4 px-8"
            >
              <Text className="text-white text-lg font-semibold text-center">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-white/70 text-sm text-center mt-8">
            Exclusive to University of Alberta students living in Lister Residence
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}