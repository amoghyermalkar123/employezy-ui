import { createClient } from "@supabase/supabase-js";

interface UserSession {
  status: string,
  sessionExpiryIn: number | null,
}

//? creating a supabase connection everytime someone logs in is it good?
const handleLogin = async (email: string, password: string): Promise<UserSession> => {
  //loading the env variables
  const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
  const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
  //creating connection
  const supabase = createClient(PROJECT_URL, API_KEY);
  const response = await supabase.auth.signInWithPassword({ email, password });

  if (response.data.session?.user.aud === "authenticated") {
    return {
      status: "ok",
      sessionExpiryIn: response.data.session.expires_in
    };
  }

  return {
    status: "error",
    sessionExpiryIn: null,
  };
};

const registerUser = async (email: string, password: string): Promise<UserSession> => {
  //loading the env variables
  const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
  const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
  //creating connection
  const supabase = createClient(PROJECT_URL, API_KEY);
  const response = await supabase.auth.signUp({ email, password });

  if (response.data.session?.user.aud === "authenticated") {
    return {
      status: "ok",
      sessionExpiryIn: response.data.session.expires_in
    };
  }

  return {
    status: "error",
    sessionExpiryIn: null,
  };
};

export default { handleLogin, registerUser };
