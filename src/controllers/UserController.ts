import { createClient } from "@supabase/supabase-js";

//? creating a supabase connection everytime someone logs in is it good?

const handleLogin = async (email: string, password: string) => {
  //loading the env variables
  const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
  const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

  //creating connection
  const supabase = createClient(PROJECT_URL, API_KEY);

  const response = await supabase.auth.signInWithPassword({ email, password });

  console.log(response.data);
  if (response.data) {
    return "ok";
  } else {
    return "error";
  }
};

const registerUser = async (email: string, password: string) => {
  //loading the env variables
  const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
  const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

  //creating connection
  const supabase = createClient(PROJECT_URL, API_KEY);

  const response = await supabase.auth.signUp({ email, password });
  console.log(response.data);
  if (response.data) {
    return "ok";
  } else {
    return "error";
  }
};

export default { handleLogin, registerUser };
