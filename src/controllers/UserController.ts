import { createClient } from "@supabase/supabase-js";
import supabase from "../utils/supabaseClient"

interface UserSession {
  status: string,
  orgID?: string
  candidateID?: string,
  sessionExpiryIn?: number | null,
}

// TODO: create supabase client once
const handleLogin = async (email: string, password: string, isOrg:boolean): Promise<UserSession> => {
 
    if (isOrg) {
      const response = await supabase
      .from("Orgs")
      .select("*")
      .eq("email", email)
      .single();
      console.log(response.data);
      
      if (response.data) {
        localStorage.setItem('org_details', JSON.stringify(response.data))
        return {
          status: "isOrg",
          orgID: response.data["org_id"] as string
        }
      } else {
        return {
          status: "notOrg"
        }
      }
    } else {
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
    }
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
