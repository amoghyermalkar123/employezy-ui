import { createClient } from "@supabase/supabase-js";

const getAllOpenings = async () => {
  //loading the env variables
  const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
  const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
  //creating connection
  const supabase = createClient(PROJECT_URL, API_KEY);

  const response = await supabase.from("JobOpenings").select();
  console.log(response.data);

  return response.data;
};

export default getAllOpenings;
