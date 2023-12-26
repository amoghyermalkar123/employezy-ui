import supabase from "../utils/supabaseClient"

interface UserSession {
  status: string,
  orgID?: string
  candidateID?: string,
  sessionExpiryIn?: number | null,
}

// TODO: create supabase client once
const handleLogin = async (email: string, password: string, isOrg: boolean): Promise<UserSession> => {

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

const registerUser = async (name: string, email: string, password: string, isOrg: boolean): Promise<UserSession> => {

  if (isOrg) {
    const response = await supabase.from('Orgs').insert({ email, password });
    console.log(response.status)
    if (response.status === 200) {
      return {
        status: "ok",
      };
    }
    return {
      status: "error from the supabase",
    };

  } else {
    const response = await supabase.auth.signUp({email, password })
    console.log(response.data)
    if (response.data) {
      
      const res = await supabase.from("Users").insert({email, password})
      console.log(res.data);
      
      return {
        status: "ok",
      };
    }
    return {
      status: "error from the supabase",
    };
  }

};


const handleLogout = async () => {
  const response = await supabase.auth.signOut();
  console.log(response);
  if (response.error === null) {
    return "ok"
  }
  return "error"
}

export default { handleLogin, registerUser, handleLogout };
