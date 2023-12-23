import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient.ts";
const pastelColors = [
  "bg-pink-200",
  "bg-blue-200",
  "bg-purple-200",
  "bg-green-200",
  "bg-teal-200",
  "bg-orange-200",
  "bg-indigo-200",
  "bg-red-200"
];

// Function to get a random pastel color from the array
const getRandomPastelColor = () => {
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
};


function AppliedJobs() {
    const [evaluation, setEvaluation] = useState("")
    supabase.channel('sub_res_insert_events')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'SubmissionResults' },
            (payload) => {
                console.log('Change received!', payload)
                setEvaluation(payload.new.evaluation)
            }
        )
        .subscribe()

    return (
        <>
            <div className={`collapse border-2 m-3 p-2 w-3/4 shadow-md  bg-blue-300`}>
                <input type="radio" name="my-accordion-1"/>
                <div className="collapse-title text-xl font-medium">
                    <span className="font-mono">company: </span> <span className="font-mono font-semibold">position</span>
                </div>
                <div className="collapse-content bg-teal-200 rounded-md">
                    <p className="flex flex-row">
                        <span className="font font-mono">Evaluation:</span>
                        <p>{evaluation}</p>
                    </p>
                </div>
            </div>
        </>
    );
}

export default AppliedJobs;
