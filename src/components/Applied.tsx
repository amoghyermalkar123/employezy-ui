/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient.ts";
import jc from "../controllers/JobController";
//import zustandStore from "../store/ZustandStore.ts";

function AppliedJobs() {
//    const { loadAppliedJobs } = zustandStore();
//    const appliedJobs = zustandStore(state => state.appliedJobs);

    const [appliedJobs, setAppliedJobs] = useState<any[]>([])
    const getEvals = async () => {
        const res: any = await jc.fetchAppliedJobs();
        if (res != null) {
            // loadAppliedJobs(res.data)
        }
        console.log(res)
    setAppliedJobs(res)
    };

    useEffect(() => {
        supabase
            .channel("sub_res_insert_events")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "CandidateSubmissions" },
                payload => {
                    console.log("Change received!", payload);
                }
            )
            .subscribe();
    })
   
  useEffect(()=>{
    getEvals();
  }, [])

    return (
        <div className="w-screen h-screen">
            <div className=" h-full mx-4 md:mx-12 lg:mx-24 xl:mx-48">
                <div className="w-full flex flex-col p-8 border-2 shadow-md my-2 rounded-lg">
                    <div className="w-full flex flex-row justify-between items-center">
                        <h2>company</h2>
                        <h2>rating</h2>
                    </div>
                    <div className="divider divide-x-0"></div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur laborum eligendi alias distinctio eos ipsam ipsum nulla! Iste dolore, cupiditate sunt aliquam a hic eius iusto maiores alias, inventore error pariatur! Cum pariatur debitis fugiat maiores expedita, est ullam ad nesciunt voluptatibus, voluptate nisi velit beatae odit! Maxime error mollitia cupiditate quo nisi illo quia similique quod, aut nemo impedit, tenetur tempore quidem natus, aspernatur repellat non est! Quo nam soluta, dolore dolorem temporibus maxime quis delectus modi doloremque quidem eligendi repudiandae dolor quisquam, ab quibusdam nesciunt accusantium debitis odio libero dolores cum. Excepturi, necessitatibus nisi aut commodi aliquid reprehenderit!</p>
                </div>
            </div>
        </div>
    );
}

export default AppliedJobs;
