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
  StyleSheet,
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

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="school" size={32} color="#158b4b" />
              <Text style={styles.logoText}>Listergram</Text>
            </View>
            <Text style={styles.subtitle}>Lister Hall Community</Text>
            <Text style={styles.description}>Connect with fellow UofA students</Text>
          </View>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'signin' && styles.activeTab]}
              onPress={() => setActiveTab('signin')}
            >
              <Text style={[styles.tabText, activeTab === 'signin' && styles.activeTabText]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
              onPress={() => setActiveTab('signup')}
            >
              <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>University Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your.name@ualberta.ca"
                  value={signInData.email}
                  onChangeText={(text) => setSignInData(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={signInData.password}
                  onChangeText={(text) => setSignInData(prev => ({ ...prev, password: text }))}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    value={signUpData.fullName}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, fullName: text }))}
                  />
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="john_doe123"
                    value={signUpData.username}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, username: text }))}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>University Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your.name@ualberta.ca"
                  value={signUpData.email}
                  onChangeText={(text) => setSignUpData(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={signUpData.password}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, password: text }))}
                    secureTextEntry
                  />
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={signUpData.confirmPassword}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, confirmPassword: text }))}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Tower</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={signUpData.tower}
                      onValueChange={(value) => setSignUpData(prev => ({ ...prev, tower: value }))}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select tower" value="" />
                      {towers.map(tower => (
                        <Picker.Item key={tower} label={tower} value={tower} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Floor</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Floor"
                    value={signUpData.floor.toString()}
                    onChangeText={(text) => setSignUpData(prev => ({ ...prev, floor: parseInt(text) || 1 }))}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Program</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={signUpData.program}
                    onValueChange={(value) => setSignUpData(prev => ({ ...prev, program: value }))}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select program" value="" />
                    {programs.map(program => (
                      <Picker.Item key={program} label={program} value={program} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Year of Study</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={signUpData.yearOfStudy}
                    onValueChange={(value) => setSignUpData(prev => ({ ...prev, yearOfStudy: value }))}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select year" value="" />
                    {yearOptions.map(year => (
                      <Picker.Item key={year} label={year} value={year} />
                    ))}
                  </Picker>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.button, styles.signUpButton]}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#158b4b',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#1f2937',
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  halfWidth: {
    flex: 0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#158b4b',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signUpButton: {
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});