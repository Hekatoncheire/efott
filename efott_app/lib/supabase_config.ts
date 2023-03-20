import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://nkhjzsnydrbgudjnxvar.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5raGp6c255ZHJiZ3Vkam54dmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzMDM0NzMsImV4cCI6MTk5NDg3OTQ3M30.c0kL2Z_8pLqUIq4aVkU8sYAvK7yPqYU__J5bw9Ai5Y0"

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