import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type TowerType = 'Henday' | 'Mackenzie' | 'Schaffer' | 'Kelsey' | 'Assiniboia';
type YearOfStudy = '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | '5th+ Year' | 'Graduate Student' | 'PhD Student';
type ListerRole = 'Common Resident' | 'Floor Captain' | 'Resident Assistant' | 'VP Finance' | 'VP Internal' | 'VP Mackenzie' | 'VP Schaffer' | 'VP Henday' | 'VP Kelsey' | 'President' | 'Other Leadership';

interface Profile {
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

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setProfile(data);
        }
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      setProfile(data);
      return { data };
    } catch (err) {
      return { error: 'Failed to update profile' };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile
  };
};