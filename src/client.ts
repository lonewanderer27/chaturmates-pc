import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

export const client = createClient<Database>(
  process.env.VITE_SUPABASE_API_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);