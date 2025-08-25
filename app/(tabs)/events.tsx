import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: {
    name: string;
    role: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees?: number;
  category: "study" | "social" | "fitness" | "tower" | "food" | "cultural";
  tower?: string;
  isAttending: boolean;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Henday 7th Floor Study Session",
    description: "Group study for ECON 101 midterm. Pizza provided! 🍕",
    date: "2024-01-15",
    time: "7:00 PM",
    location: "Henday Study Lounge",
    organizer: {
      name: "Sarah Chen",
      role: "Floor Captain",
      avatar: ""
    },
    attendees: 12,
    maxAttendees: 20,
    category: "study",
    tower: "Henday",
    isAttending: true
  },
  {
    id: "2",
    title: "Lister Cafe Karaoke Night",
    description: "Show off your singing skills! Open to all Lister residents. Prizes for best performances! 🎤",
    date: "2024-01-16",
    time: "8:00 PM",
    location: "Lister Cafe",
    organizer: {
      name: "Marcus Johnson",
      role: "VP Internal",
      avatar: ""
    },
    attendees: 45,
    maxAttendees: 80,
    category: "social",
    isAttending: false
  },
  {
    id: "3",
    title: "Morning Yoga Class",
    description: "Start your day right with relaxing yoga. Mats provided. All skill levels welcome! 🧘‍♀️",
    date: "2024-01-15",
    time: "7:00 AM",
    location: "Lister Gym",
    organizer: {
      name: "Emma Wilson",
      role: "Wellness Coordinator",
      avatar: ""
    },
    attendees: 8,
    maxAttendees: 15,
    category: "fitness",
    isAttending: false
  },
];

const categoryColors = {
  study: "bg-blue-100 text-blue-800 border-blue-200",
  social: "bg-purple-100 text-purple-800 border-purple-200", 
  fitness: "bg-green-100 text-green-800 border-green-200",
  tower: "bg-primary/10 text-primary border-primary/20",
  food: "bg-orange-100 text-orange-800 border-orange-200",
  cultural: "bg-pink-100 text-pink-800 border-pink-200"
};

export default function EventsScreen() {
  const [events, setEvents] = useState(mockEvents);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRSVP = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isAttending: !event.isAttending,
            attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1
          }
        : event
    ));
  };

  const getEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === "all" || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderEvent = ({ item }: { item: Event }) => (
    <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4 mx-4">
      {/* Event Header */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
            <Text className="text-white font-semibold text-sm">
              {item.organizer.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-medium text-sm">{item.organizer.name}</Text>
            <Text className="text-xs text-gray-500">{item.organizer.role}</Text>
          </View>
        </View>
        <View className="items-end">
          <View className={`px-2.5 py-0.5 rounded-full border ${categoryColors[item.category]}`}>
            <Text className="text-xs font-medium capitalize">{item.category}</Text>
          </View>
          {item.tower && (
            <View className="bg-gray-100 px-2 py-0.5 rounded-full mt-1">
              <Text className="text-xs text-gray-600">{item.tower} Tower</Text>
            </View>
          )}
        </View>
      </View>

      {/* Event Details */}
      <View className="mb-4">
        <Text className="font-semibold text-lg mb-2">{item.title}</Text>
        <Text className="text-gray-600 text-sm mb-3">{item.description}</Text>
        
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar-outline" size={16} color="#64748b" />
          <Text className="text-sm text-gray-600 ml-2">{getEventDate(item.date)}</Text>
          <Ionicons name="time-outline" size={16} color="#64748b" className="ml-4" />
          <Text className="text-sm text-gray-600 ml-2">{item.time}</Text>
        </View>
        
        <View className="flex-row items-center mb-2">
          <Ionicons name="location-outline" size={16} color="#64748b" />
          <Text className="text-sm text-gray-600 ml-2">{item.location}</Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="people-outline" size={16} color="#64748b" />
          <Text className="text-sm text-gray-600 ml-2">
            {item.attendees} attending
            {item.maxAttendees && ` • ${item.maxAttendees - item.attendees} spots left`}
          </Text>
        </View>
      </View>

      {/* RSVP Button */}
      <TouchableOpacity
        onPress={() => handleRSVP(item.id)}
        className={`rounded-lg py-3 items-center ${
          item.isAttending 
            ? 'bg-primary' 
            : 'bg-gray-100'
        }`}
      >
        <Text className={`font-semibold ${
          item.isAttending ? 'text-white' : 'text-gray-700'
        }`}>
          {item.isAttending ? 'Attending ✓' : 'Join Event'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-4">
        <View className="relative mb-4">
          <Ionicons name="search" size={20} color="#64748b" className="absolute left-3 top-3 z-10" />
          <TextInput
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="bg-gray-100 rounded-lg pl-10 pr-4 py-3 text-base"
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className={`px-4 py-2 rounded-full ${filter === "all" ? 'bg-primary' : 'bg-gray-100'}`}
              onPress={() => setFilter("all")}
            >
              <Text className={`text-sm font-medium ${filter === "all" ? 'text-white' : 'text-gray-700'}`}>
                All Events
              </Text>
            </TouchableOpacity>
            {Object.keys(categoryColors).map((category) => (
              <TouchableOpacity
                key={category}
                className={`px-4 py-2 rounded-full ${filter === category ? 'bg-primary' : 'bg-gray-100'}`}
                onPress={() => setFilter(category)}
              >
                <Text className={`text-sm font-medium capitalize ${filter === category ? 'text-white' : 'text-gray-700'}`}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="calendar-outline" size={48} color="#64748b" />
            <Text className="text-xl font-semibold text-gray-600 mt-4">No events found</Text>
            <Text className="text-sm text-gray-500 mt-1">Try adjusting your filters</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}