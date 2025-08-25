import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Picker } from '@react-native-picker/picker';

const towers = ['Henday', 'Mackenzie', 'Schaffer', 'Kelsey', 'Assiniboia'];
const programs = [
  'Engineering', 'Business', 'Science', 'Arts', 'Medicine', 'Nursing',
  'Education', 'Computing Science', 'Psychology', 'Political Science', 'Other'
];
const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th+ Year', 'Graduate Student', 'PhD Student'];

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    tower: '',
    floor: 1,
    program: '',
    yearOfStudy: ''
  });

  const validateUofAEmail = (email: string) => {
    return email.endsWith('@ualberta.ca');
  };

  const handleSignIn = async () => {
    setLoading(true);

    if (!validateUofAEmail(signInData.email)) {
      Alert.alert("Invalid Email", "Please use your @ualberta.ca email address.");
      setLoading(false);
      return;
    }

    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      Alert.alert("Sign In Failed", error.message);
    }

    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);

    // Validation
    if (!validateUofAEmail(signUpData.email)) {
      Alert.alert("Invalid Email", "Please use your @ualberta.ca email address.");
      setLoading(false);
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      setLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (signUpData.floor < 1 || signUpData.floor > 20) {
      Alert.alert("Invalid Floor", "Floor must be between 1 and 20.");
      setLoading(false);
      return;
    }

    const metadata = {
      full_name: signUpData.fullName,
      username: signUpData.username,
      tower: signUpData.tower,
      floor: signUpData.floor,
      program: signUpData.program,
      year_of_study: signUpData.yearOfStudy
    };

    const { error } = await signUp(signUpData.email, signUpData.password, metadata);

    if (error) {
      Alert.alert("Sign Up Failed", error.message);
    } else {
      Alert.alert("Welcome to Listergram!", "Please check your email to verify your account.");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-primary/20 to-secondary/20">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="flex-row items-center mb-4">
              <Ionicons name="school" size={32} color="#158b4b" />
              <Text className="text-3xl font-bold text-primary ml-2">Listergram</Text>
            </View>
            <Text className="text-xl font-semibold text-gray-800">Lister Hall Community</Text>
            <Text className="text-gray-600 mt-1">Connect with fellow UofA students</Text>
          </View>

          {/* Tab Selector */}
          <View className="flex-row bg-gray-100 rounded-lg p-1 mb-6">
            <TouchableOpacity
              className={`flex-1 py-3 rounded-md ${activeTab === 'signin' ? 'bg-white shadow-sm' : ''}`}
              onPress={() => setActiveTab('signin')}
            >
              <Text className={`text-center font-medium ${activeTab === 'signin' ? 'text-gray-900' : 'text-gray-600'}`}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-md ${activeTab === 'signup' ? 'bg-white shadow-sm' : ''}`}
              onPress={() => setActiveTab('signup')}
            >
              <Text className={`text-center font-medium ${activeTab === 'signup' ? 'text-gray-900' : 'text-gray-600'}`}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">University Email</Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                  placeholder="your.name@ualberta.ca"
                  value={signInData.email}
                  onChangeText={(text) => setSignInData(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                  placeholder="Password"
                  value={signInData.password}
                  onChangeText={(text) => setSignInData(prev => ({ ...prev, password: text }))}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                className="bg-primary rounded-lg py-4 items-center"
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">Sign In</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <View className="space-y-4">
              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="John Doe"
                    value={signUpData.fullName}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, fullName: text }))}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Username</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="john_doe123"
                    value={signUpData.username}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, username: text }))}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">University Email</Text>
                <TextInput
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                  placeholder="your.name@ualberta.ca"
                  value={signUpData.email}
                  onChangeText={(text) => setSignUpData(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="Password"
                    value={signUpData.password}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, password: text }))}
                    secureTextEntry
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Confirm Password</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="Confirm Password"
                    value={signUpData.confirmPassword}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, confirmPassword: text }))}
                    secureTextEntry
                  />
                </View>
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Tower</Text>
                  <View className="bg-white border border-gray-300 rounded-lg">
                    <Picker
                      selectedValue={signUpData.tower}
                      onValueChange={(value) => setSignUpData(prev => ({ ...prev, tower: value }))}
                    >
                      <Picker.Item label="Select tower" value="" />
                      {towers.map(tower => (
                        <Picker.Item key={tower} label={tower} value={tower} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Floor</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                    placeholder="Floor"
                    value={signUpData.floor.toString()}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, floor: parseInt(text) || 1 }))}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Program</Text>
                <View className="bg-white border border-gray-300 rounded-lg">
                  <Picker
                    selectedValue={signUpData.program}
                    onValueChange={(value) => setSignUpData(prev => ({ ...prev, program: value }))}
                  >
                    <Picker.Item label="Select program" value="" />
                    {programs.map(program => (
                      <Picker.Item key={program} label={program} value={program} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Year of Study</Text>
                <View className="bg-white border border-gray-300 rounded-lg">
                  <Picker
                    selectedValue={signUpData.yearOfStudy}
                    onValueChange={(value) => setSignUpData(prev => ({ ...prev, yearOfStudy: value }))}
                  >
                    <Picker.Item label="Select year" value="" />
                    {yearOptions.map(year => (
                      <Picker.Item key={year} label={year} value={year} />
                    ))}
                  </Picker>
                </View>
              </View>

              <TouchableOpacity
                className="bg-primary rounded-lg py-4 items-center mt-6"
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">Create Account</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}