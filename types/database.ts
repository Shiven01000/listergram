export type TowerType = 'Henday' | 'Mackenzie' | 'Schaffer' | 'Kelsey' | 'Assiniboia';
export type YearOfStudy = '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | '5th+ Year' | 'Graduate Student' | 'PhD Student';
export type ListerRole = 'Common Resident' | 'Floor Captain' | 'Resident Assistant' | 'VP Finance' | 'VP Internal' | 'VP Mackenzie' | 'VP Schaffer' | 'VP Henday' | 'VP Kelsey' | 'President' | 'Other Leadership';
export type PostType = 'photo' | 'video' | 'reel';
export type MatchType = 'dating' | 'friends';
export type MessageType = 'text' | 'image' | 'video' | 'voice';
export type EventCategory = 'floor_meeting' | 'study_session' | 'social_gathering' | 'fitness_class' | 'food_event' | 'cultural_night' | 'other';
export type RSVPStatus = 'attending' | 'maybe' | 'not_going';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  username: string;
  tower: TowerType;
  floor: number;
  program: string;
  year_of_study: YearOfStudy;
  lister_role: ListerRole;
  role_verified: boolean;
  fav_caf_food?: string;
  profile_pic_url?: string;
  bio?: string;
  interests: string[];
  age?: number;
  pronouns?: string;
  dating_enabled: boolean;
  friend_mode_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  media_urls: string[];
  caption?: string;
  location?: string;
  hashtags: string[];
  post_type: PostType;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  likes?: Like[];
  comments?: Comment[];
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  text: string;
  parent_comment_id?: string;
  created_at: string;
  profiles?: Profile;
}

export interface Event {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  location: string;
  datetime: string;
  max_attendees?: number;
  category: EventCategory;
  tower_specific?: TowerType;
  requires_approval: boolean;
  approved_by?: string;
  approval_status: ApprovalStatus;
  recurring_pattern?: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  event_rsvps?: EventRSVP[];
}

export interface EventRSVP {
  id: string;
  event_id: string;
  user_id: string;
  status: RSVPStatus;
  rsvp_date: string;
  checked_in: boolean;
}