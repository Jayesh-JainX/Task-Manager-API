import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://atafgvpjrckhuhfmcfif.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YWZndnBqcmNraHVoZm1jZmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDAwOTQsImV4cCI6MjA2Mjk3NjA5NH0.0-GYhRlV7xjI7p4hhx0_6uzttzNX6qmxLAudPKfk36A";

export const supabase = createClient(supabaseUrl, supabaseKey);
