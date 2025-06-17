import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ifrlxqakxnsgdpighods.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmcmx4cWFreG5zZ2RwaWdob2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4ODEzODgsImV4cCI6MjA2NTQ1NzM4OH0.Uq4a_jVr93_VN_QZrAgRLvzBLNCSrDR4rxe12ZKSS_4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // This line MUST be here for login to be remembered
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});