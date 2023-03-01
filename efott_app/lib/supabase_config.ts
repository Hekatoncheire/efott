import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://hikihegmspdnacnfrfpe.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpa2loZWdtc3BkbmFjbmZyZnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2NzcxOTYsImV4cCI6MTk5MzI1MzE5Nn0.7DLNd6re0F4mk7alymrXs7BFs-CNaryiSXp0JTcVsxw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})