import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator, Text } from 'react-native';

export default function Index() {
  useEffect(() => {
    // For now, just go to auth
    router.replace('/(auth)');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' }}>
      <ActivityIndicator size="large" color="#158b4b" />
      <Text style={{ marginTop: 16, fontSize: 16, color: '#6b7280' }}>Loading Listergram...</Text>
    </View>
  );
}