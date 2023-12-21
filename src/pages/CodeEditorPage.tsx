/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@monaco-editor/react";
import { useLocation, useNavigate } from "react-router-dom";
import zustandStore from "../store/ZustandStore";
import jc from "../controllers/JobController";
import CandidateSubmission from "../types/submission";
import { useState } from "react";

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
    navigate("/home");
  }

  return (
    <div className="h-screen w-screen">
      <div className="h-full flex flex-row">
        <div className="flex flex-col w-96 bg-base-300 p-4">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl">Question</h2>
          </div>
          <p className="my-4">
            {submission.code_question}
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
