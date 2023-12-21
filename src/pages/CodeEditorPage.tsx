/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@monaco-editor/react";
import { useLocation, useNavigate } from "react-router-dom";
import zustandStore from "../store/ZustandStore";
import jc from "../controllers/JobController";
import CandidateSubmission from "../types/submission";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError
} from "@supabase/supabase-js";

function CodeEditorPage() {
  const { state } = useLocation();
  const submission = JSON.parse(state);
  const navigate = useNavigate();
  const candidateId = zustandStore(state => state.userId);
  const [code, setCode] = useState("");

  function handleCodechange(value: any, ev: any) {
    setCode(value);
    console.log("ev", ev);
  }

  async function submitAssignment() {
    const finalSubmission: CandidateSubmission = {
      ai_evaluation: "",
      candidate_id: candidateId,
      opening_id: submission.opening_id,
      code: code
    };
    submission.candidate_id = candidateId;
    const res = await jc.submitAssignment(finalSubmission);
    console.log("submitted", res);
    //loading the env variables
    const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
    const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
    //creating connection
    const supabase = createClient(PROJECT_URL, API_KEY);
    const queryData = {
      query: "What is supabase?"
    };
    const { data, error } = await supabase.functions.invoke("openai", {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZmVuZ3JkYXBidmVnb2FhcWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDMwNDAsImV4cCI6MjAxODQ3OTA0MH0.XnrjvUM64oUvwG9sCl4VNsZg6b_FDdu5l7-kbL-cW-Q"
      },
      body: JSON.stringify(queryData),
      method: "POST"
    });

    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json();
      console.log("Function returned an error", errorMessage);
    } else if (error instanceof FunctionsRelayError) {
      console.log("Relay error:", error.message);
    } else if (error instanceof FunctionsFetchError) {
      console.log("Fetch error:", error.message, data);
    }
    console.log("data from EF", data);
    navigate("/home");
  }

  return (
    <div className="h-screen w-screen">
      <div className="h-full flex flex-row">
        <div className="flex flex-col w-96 bg-base-300 p-4">
          <h2 className="text-2xl">Question</h2>
          <p className="my-4">
            {submission.codeQuestion}
          </p>
          <div className="flex-1" />
          <button
            className="btn border-black border-1"
            onClick={() => {
              submitAssignment();
            }}
          >
            Next
          </button>
        </div>
        <div className="w-full">
          <Editor
            defaultLanguage="javascript"
            defaultValue=""
            onChange={handleCodechange}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeEditorPage;
