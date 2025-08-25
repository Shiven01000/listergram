import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = "https://bmoenqevqqfnozpddyrj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2VucWV2cXFmbm96cGRkeXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDU3MDEsImV4cCI6MjA3MTcyMTcwMX0.F18_TaQR8cCnIhnplRSd7X7dvGcLLgpPiPkmWfZ1nW4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});