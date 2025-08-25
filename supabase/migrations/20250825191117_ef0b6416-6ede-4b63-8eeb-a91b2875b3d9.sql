-- Create custom types for better data validation
CREATE TYPE public.tower_type AS ENUM ('Henday', 'Mackenzie', 'Schaffer', 'Kelsey', 'Assiniboia');
CREATE TYPE public.year_of_study AS ENUM ('1st Year', '2nd Year', '3rd Year', '4th Year', '5th+ Year', 'Graduate Student', 'PhD Student');
CREATE TYPE public.lister_role AS ENUM ('Common Resident', 'Floor Captain', 'Resident Assistant', 'VP Finance', 'VP Internal', 'VP Mackenzie', 'VP Schaffer', 'VP Henday', 'VP Kelsey', 'President', 'Other Leadership');
CREATE TYPE public.post_type AS ENUM ('photo', 'video', 'reel');
CREATE TYPE public.match_type AS ENUM ('dating', 'friends');
CREATE TYPE public.message_type AS ENUM ('text', 'image', 'video', 'voice');
CREATE TYPE public.event_category AS ENUM ('floor_meeting', 'study_session', 'social_gathering', 'fitness_class', 'food_event', 'cultural_night', 'other');
CREATE TYPE public.rsvp_status AS ENUM ('attending', 'maybe', 'not_going');
CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.marketplace_category AS ENUM ('textbooks', 'furniture', 'electronics', 'clothing', 'meal_plans', 'other');
CREATE TYPE public.report_status AS ENUM ('pending', 'reviewed', 'resolved', 'dismissed');

-- Users/Profiles table with extended fields
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  tower tower_type NOT NULL,
  floor INTEGER NOT NULL CHECK (floor >= 1 AND floor <= 20),
  program TEXT NOT NULL,
  year_of_study year_of_study NOT NULL,
  lister_role lister_role DEFAULT 'Common Resident',
  role_verified BOOLEAN DEFAULT FALSE,
  fav_caf_food TEXT,
  profile_pic_url TEXT,
  bio TEXT CHECK (LENGTH(bio) <= 150),
  interests TEXT[] DEFAULT '{}',
  age INTEGER CHECK (age >= 18 AND age <= 30),
  pronouns TEXT,
  dating_enabled BOOLEAN DEFAULT FALSE,
  friend_mode_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  media_urls TEXT[] DEFAULT '{}',
  caption TEXT,
  location TEXT,
  hashtags TEXT[] DEFAULT '{}',
  post_type post_type DEFAULT 'photo',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes table
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Comments table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Follows table
CREATE TABLE public.follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Matches table for dating/friends
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  match_type match_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '72 hours'),
  conversation_started BOOLEAN DEFAULT FALSE,
  UNIQUE(user1_id, user2_id, match_type),
  CHECK (user1_id != user2_id)
);

-- Messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT,
  media_url TEXT,
  message_type message_type DEFAULT 'text',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  datetime TIMESTAMPTZ NOT NULL,
  max_attendees INTEGER,
  category event_category DEFAULT 'other',
  tower_specific tower_type,
  requires_approval BOOLEAN DEFAULT FALSE,
  approved_by UUID REFERENCES public.profiles(id),
  approval_status approval_status DEFAULT 'pending',
  recurring_pattern TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event RSVPs table
CREATE TABLE public.event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status rsvp_status DEFAULT 'attending',
  rsvp_date TIMESTAMPTZ DEFAULT NOW(),
  checked_in BOOLEAN DEFAULT FALSE,
  UNIQUE(event_id, user_id)
);

-- Event posts table
CREATE TABLE public.event_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  media_urls TEXT[] DEFAULT '{}',
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marketplace table
CREATE TABLE public.marketplace (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category marketplace_category DEFAULT 'other',
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_content_id UUID,
  reason TEXT NOT NULL,
  status report_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for posts
CREATE POLICY "Users can view all posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users can create their own posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.posts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for likes
CREATE POLICY "Users can view all likes" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Users can create their own likes" ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes" ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for comments
CREATE POLICY "Users can view all comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can create their own comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for follows
CREATE POLICY "Users can view all follows" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can create their own follows" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete their own follows" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- RLS Policies for matches
CREATE POLICY "Users can view their own matches" ON public.matches FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);
CREATE POLICY "System can create matches" ON public.matches FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own matches" ON public.matches FOR UPDATE USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their matches" ON public.messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.matches 
    WHERE matches.id = messages.match_id 
    AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
  )
);
CREATE POLICY "Users can send messages in their matches" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.matches 
    WHERE matches.id = match_id 
    AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
  )
);

-- RLS Policies for events
CREATE POLICY "Users can view all events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Users can create events" ON public.events FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update their own events" ON public.events FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete their own events" ON public.events FOR DELETE USING (auth.uid() = creator_id);

-- RLS Policies for event RSVPs
CREATE POLICY "Users can view event RSVPs" ON public.event_rsvps FOR SELECT USING (true);
CREATE POLICY "Users can create their own RSVPs" ON public.event_rsvps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own RSVPs" ON public.event_rsvps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own RSVPs" ON public.event_rsvps FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for event posts
CREATE POLICY "Users can view event posts" ON public.event_posts FOR SELECT USING (true);
CREATE POLICY "Users can create event posts" ON public.event_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own event posts" ON public.event_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own event posts" ON public.event_posts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for marketplace
CREATE POLICY "Users can view all marketplace items" ON public.marketplace FOR SELECT USING (true);
CREATE POLICY "Users can create their own listings" ON public.marketplace FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Users can update their own listings" ON public.marketplace FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Users can delete their own listings" ON public.marketplace FOR DELETE USING (auth.uid() = seller_id);

-- RLS Policies for reports
CREATE POLICY "Users can create reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Users can view their own reports" ON public.reports FOR SELECT USING (auth.uid() = reporter_id);

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-pictures', 'profile-pictures', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('post-media', 'post-media', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('event-media', 'event-media', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('marketplace-images', 'marketplace-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('message-media', 'message-media', false);

-- Storage policies for profile pictures
CREATE POLICY "Public Access for Profile Pictures" ON storage.objects FOR SELECT USING (bucket_id = 'profile-pictures');
CREATE POLICY "Users can upload their own profile pictures" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own profile pictures" ON storage.objects FOR UPDATE USING (
  bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can delete their own profile pictures" ON storage.objects FOR DELETE USING (
  bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for post media
CREATE POLICY "Public Access for Post Media" ON storage.objects FOR SELECT USING (bucket_id = 'post-media');
CREATE POLICY "Users can upload post media" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'post-media' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own post media" ON storage.objects FOR UPDATE USING (
  bucket_id = 'post-media' AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can delete their own post media" ON storage.objects FOR DELETE USING (
  bucket_id = 'post-media' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for event media
CREATE POLICY "Public Access for Event Media" ON storage.objects FOR SELECT USING (bucket_id = 'event-media');
CREATE POLICY "Users can upload event media" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'event-media' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for marketplace images
CREATE POLICY "Public Access for Marketplace Images" ON storage.objects FOR SELECT USING (bucket_id = 'marketplace-images');
CREATE POLICY "Users can upload marketplace images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'marketplace-images' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for private message media
CREATE POLICY "Users can view message media in their conversations" ON storage.objects FOR SELECT USING (
  bucket_id = 'message-media' AND
  EXISTS (
    SELECT 1 FROM public.matches m
    WHERE m.id::text = (storage.foldername(name))[1]
    AND (m.user1_id = auth.uid() OR m.user2_id = auth.uid())
  )
);
CREATE POLICY "Users can upload message media" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'message-media' AND
  EXISTS (
    SELECT 1 FROM public.matches m
    WHERE m.id::text = (storage.foldername(name))[1]
    AND (m.user1_id = auth.uid() OR m.user2_id = auth.uid())
  )
);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, username, tower, floor, program, year_of_study)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE((NEW.raw_user_meta_data->>'tower')::tower_type, 'Henday'),
    COALESCE((NEW.raw_user_meta_data->>'floor')::integer, 1),
    COALESCE(NEW.raw_user_meta_data->>'program', 'Undeclared'),
    COALESCE((NEW.raw_user_meta_data->>'year_of_study')::year_of_study, '1st Year')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_marketplace_updated_at BEFORE UPDATE ON public.marketplace FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_rsvps;