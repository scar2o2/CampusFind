// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Copy these from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // e.g., "https://xyzcompany.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // safe to use in frontend

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
