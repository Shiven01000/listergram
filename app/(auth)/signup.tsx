import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '@/contexts/AuthContext';
import { TowerType, YearOfStudy } from '@/types/database';
import Toast from 'react-native-toast-message';

const TOWERS: TowerType[] = ['Henday', 'Mackenzie', 'Schaffer', 'Kelsey', 'Assiniboia'];
const YEARS: YearOfStudy[] = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th+ Year', 'Graduate Student', 'PhD Student'];

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    tower: 'Henday' as TowerType,
    floor: '',
    program: '',
    yearOfStudy: '1st Year' as YearOfStudy,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const validateForm = () => {
    if (!formData.email.endsWith('@ualberta.ca')) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please use your @ualberta.ca email address',
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'Passwords do not match',
      });
      return false;
    }

    if (formData.password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Weak Password',
        text2: 'Password must be at least 6 characters',
      });
      return false;
    }

    const floor = parseInt(formData.floor);
    if (!floor || floor < 1 || floor > 20) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Floor',
        text2: 'Floor must be between 1 and 20',
      });
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      username: formData.username,
      tower: formData.tower,
      floor: parseInt(formData.floor),
      program: formData.program,
      year_of_study: formData.yearOfStudy,
    });
    setLoading(false);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Account Created!',
        text2: 'Welcome to Listergram',
      });
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 mb-6"
        >
          <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Join Listergram
        </Text>
        <Text className="text-gray-600 mb-6">
          Create your account to connect with the Lister community
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
            <TextInput
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              placeholder="John Doe"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Username</Text>
            <TextInput
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text.toLowerCase() })}
              placeholder="johndoe"
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Email</Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="john.doe@ualberta.ca"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Password</Text>
            <View className="relative">
              <TextInput
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                className="border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Confirm Password</Text>
            <View className="relative">
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                placeholder="Confirm password"
                secureTextEntry={!showConfirmPassword}
                className="border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-gray-700 font-medium mb-2">Tower</Text>
              <View className="border border-gray-300 rounded-lg">
                <Picker
                  selectedValue={formData.tower}
                  onValueChange={(value) => setFormData({ ...formData, tower: value })}
                >
                  {TOWERS.map((tower) => (
                    <Picker.Item key={tower} label={tower} value={tower} />
                  ))}
                </Picker>
              </View>
            </View>

            <View className="w-20">
              <Text className="text-gray-700 font-medium mb-2">Floor</Text>
              <TextInput
                value={formData.floor}
                onChangeText={(text) => setFormData({ ...formData, floor: text })}
                placeholder="1-20"
                keyboardType="numeric"
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Program of Study</Text>
            <TextInput
              value={formData.program}
              onChangeText={(text) => setFormData({ ...formData, program: text })}
              placeholder="e.g., Computer Science, Engineering"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Year of Study</Text>
            <View className="border border-gray-300 rounded-lg">
              <Picker
                selectedValue={formData.yearOfStudy}
                onValueChange={(value) => setFormData({ ...formData, yearOfStudy: value })}
              >
                {YEARS.map((year) => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            className={`rounded-lg py-4 mt-6 ${
              loading ? 'bg-gray-400' : 'bg-primary-600'
            }`}
          >
            <Text className="text-white text-lg font-semibold text-center">
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-6 mb-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-primary-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}