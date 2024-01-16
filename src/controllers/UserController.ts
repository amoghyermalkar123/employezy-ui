import supabase from "../utils/supabaseClient"
import { UserSession } from "../models/User";
import Nudge from "../models/nudge";

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

const registerUser = async (email: string, password: string): Promise<UserSession> => {

    const response = await supabase.from('Orgs').insert({ email, password });

    if (!response.data) {
        return {
            status: "ok",
        };
    }
    return {
        status: "error",
    };
};


const handleLogout = async () => {
    const response = await supabase.auth.signOut();
    console.log(response);
    if (response.error === null) {
        return "ok"
    }
    return "error"
}

const nudgeAboutOpening = async (nudge: Nudge) => {
    const response = await supabase.from("Nudges").insert(nudge);
    if (response.error === null) {
        return "ok"
    }
    return "error"
}

export default { handleLogin, registerUser, handleLogout, nudgeAboutOpening };
