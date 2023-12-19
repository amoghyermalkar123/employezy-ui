/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@monaco-editor/react";
import { useLocation } from "react-router-dom";

function CodeEditorPage() {
  const { state } = useLocation();
  const data = JSON.parse(state);

  console.log(data);

  return (
    <div className="h-screen w-screen">
      <div className="h-full flex flex-row">
        <div className="w-96 bg-base-300 p-4">
          <h2 className="text-2xl">Question</h2>
          <p className="my-4">
            {data.code_quest}
          </p>
        </div>
        <div className="w-full">
          <Editor defaultLanguage="javascript" defaultValue="" />
        </div>
      </div>
    </div>
  );
}

export default CodeEditorPage;
