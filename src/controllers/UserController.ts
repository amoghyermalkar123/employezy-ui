import { createClient } from "@supabase/supabase-js";

interface UserSession {
  status: string,
  candidateID: string,
  sessionExpiryIn: number | null,
}

// TODO: create supabase client once
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
      candidateID: response.data.user?.id as string,
      sessionExpiryIn: response.data.session.expires_in
    };
  }

  return {
    status: "error",
    candidateID: "",
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
      candidateID: response.data.user?.id as string,
      sessionExpiryIn: response.data.session.expires_in
    };
  }

  return {
    status: "error",
    candidateID: "",
    sessionExpiryIn: null,
  };
};

export default { handleLogin, registerUser };
