import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📅 Upcoming Events</Text>
          <Text style={styles.infoText}>
            Stay connected with your Lister community through events, study sessions, and social gatherings.
          </Text>
        </View>

        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Floor Meeting - Henday 5th</Text>
          <Text style={styles.eventDescription}>
            Monthly floor meeting to discuss upcoming events
          </Text>
          
          <View style={styles.eventDetails}>
            <Text style={styles.eventDetail}>📅 Today, 7:00 PM</Text>
            <Text style={styles.eventDetail}>📍 Henday 5th Floor Lounge</Text>
            <Text style={styles.eventDetail}>👥 12 attending</Text>
          </View>

          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Event</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Study Session - CMPUT 272</Text>
          <Text style={styles.eventDescription}>
            Group study for upcoming midterm
          </Text>
          
          <View style={styles.eventDetails}>
            <Text style={styles.eventDetail}>📅 Tomorrow, 2:00 PM</Text>
            <Text style={styles.eventDetail}>📍 Mackenzie Study Room</Text>
            <Text style={styles.eventDetail}>👥 8 attending</Text>
          </View>

          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#158b4b',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#f0f9f4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f7a3f',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#158b4b',
    lineHeight: 22,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
    marginBottom: 16,
  },
  eventDetail: {
    fontSize: 14,
    color: '#6b7280',
  },
  joinButton: {
    backgroundColor: '#158b4b',
    borderRadius: 8,
    paddingVertical: 12,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});