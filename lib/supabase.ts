import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmoenqevqqfnozpddyrj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtb2VucWV2cXFmbm96cGRkeXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNTI2NzcsImV4cCI6MjA1MDcyODY3N30.Qs8_Qs8_Qs8_Qs8_Qs8_Qs8_Qs8_Qs8_Qs8_Qs8_Qs8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});