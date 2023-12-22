import { createClient } from "@supabase/supabase-js";

const initSupabase = () => {
  //loading the env variables
  const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
  const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
  //creating connection
  const supabase = createClient(PROJECT_URL, API_KEY);

  return supabase;
};

export default initSupabase();
