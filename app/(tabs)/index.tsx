import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

interface StoryUser {
  id: string;
  name: string;
  hasStory: boolean;
  isViewed: boolean;
}

interface Post {
  id: string;
  user: {
    name: string;
    username: string;
    tower: string;
    floor: number;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

const mockStories: StoryUser[] = [
  { id: "1", name: "Your Story", hasStory: false, isViewed: false },
  { id: "2", name: "Alex M.", hasStory: true, isViewed: false },
  { id: "3", name: "Emma K.", hasStory: true, isViewed: true },
  { id: "4", name: "Jake P.", hasStory: true, isViewed: false },
  { id: "5", name: "Maya S.", hasStory: true, isViewed: true },
];

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      username: "sarahc_uofa",
      tower: "Henday",
      floor: 7,
    },
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Late night study session with the floor fam! 📚 Only at Lister do you find this level of community support 💚 #ListerLife #StudyGroup #HendayTower",
    likes: 42,
    comments: 8,
    timestamp: "2h",
    isLiked: false,
  },
  {
    id: "2",
    user: {
      name: "Marcus Johnson",
      username: "marcus.j",
      tower: "Mackenzie",
      floor: 12,
    },
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Golden hour hits different when you're looking out from Mack 12! 🌅 Home sweet home #ListerSunset #MackenzieLife #UofALife",
    likes: 67,
    comments: 12,
    timestamp: "4h",
    isLiked: true,
  },
];

export default function FeedScreen() {
  const { signOut } = useAuth();
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const renderStoryItem = ({ item }: { item: StoryUser }) => (
    <TouchableOpacity style={styles.storyItem}>
      <View style={[
        styles.storyAvatar,
        item.hasStory && !item.isViewed && styles.storyAvatarUnviewed,
        item.isViewed && styles.storyAvatarViewed
      ]}>
        <View style={styles.storyAvatarInner}>
          {item.name === "Your Story" ? (
            <Ionicons name="camera" size={24} color="#64748b" />
          ) : (
            <Text style={styles.storyAvatarText}>
              {item.name.charAt(0)}
            </Text>
          )}
        </View>
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.post}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.postUserInfo}>
          <View style={styles.postAvatar}>
            <Text style={styles.postAvatarText}>
              {item.user.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.postUserDetails}>
            <View style={styles.postUserRow}>
              <Text style={styles.postUsername}>{item.user.username}</Text>
              <Text style={styles.postTimestamp}>• {item.timestamp}</Text>
            </View>
            <Text style={styles.postLocation}>
              {item.user.tower} Tower, Floor {item.user.floor}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image 
        source={{ uri: item.image }}
        style={styles.postImage}
        resizeMode="cover"
      />

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.postActionButtons}>
          <View style={styles.postActionLeft}>
            <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionButton}>
              <Ionicons 
                name={item.isLiked ? "heart" : "heart-outline"} 
                size={24} 
                color={item.isLiked ? "#ef4444" : "#64748b"} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="#64748b" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="paper-plane-outline" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Post Stats */}
        <Text style={styles.postLikes}>
          {item.likes} likes
        </Text>
        <Text style={styles.postCaption}>
          <Text style={styles.postCaptionUsername}>{item.user.username}</Text>
          <Text style={styles.postCaptionText}> {item.caption}</Text>
        </Text>
        {item.comments > 0 && (
          <Text style={styles.postComments}>
            View all {item.comments} comments
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Listergram</Text>
        <TouchableOpacity onPress={signOut}>
          <Ionicons name="log-out-outline" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.storiesContainer}>
            <FlatList
              data={mockStories}
              renderItem={renderStoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesContent}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#158b4b',
  },
  storiesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 16,
  },
  storiesContent: {
    paddingHorizontal: 16,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    backgroundColor: '#e5e7eb',
  },
  storyAvatarUnviewed: {
    backgroundColor: '#f59e0b',
  },
  storyAvatarViewed: {
    backgroundColor: '#9ca3af',
  },
  storyAvatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#158b4b',
  },
  storyName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    maxWidth: 60,
    textAlign: 'center',
  },
  post: {
    backgroundColor: 'white',
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#158b4b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAvatarText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  postUserDetails: {
    marginLeft: 12,
  },
  postUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUsername: {
    fontWeight: '600',
    fontSize: 14,
  },
  postTimestamp: {
    color: '#6b7280',
    fontSize: 12,
    marginLeft: 8,
  },
  postLocation: {
    fontSize: 12,
    color: '#6b7280',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  postActions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  postActionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
  },
  postLikes: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  postCaption: {
    fontSize: 14,
  },
  postCaptionUsername: {
    fontWeight: '600',
  },
  postCaptionText: {
    color: '#1f2937',
  },
  postComments: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});