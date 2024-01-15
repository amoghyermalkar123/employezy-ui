import { useEffect, useState } from "react";
import { Code } from "../../types/codeTypes";

function EvaluationContent({ evaluation }: { evaluation: string }) {
  const [eval1, setEval1] = useState<Code[]>([]);

  useEffect(
    () => {
      const handleEval = () => {
        try {
          const data: Code[] = JSON.parse(evaluation);
          setEval1(data);
        } catch (error) {
          console.error("Error parsing evaluation data:", error);
        }
      };

      handleEval();
    },
    [evaluation]
  );

  return (
    <div className="h-full w-full">
      <div>
        {Array.isArray(eval1) &&
          eval1.map((item, index) =>
            <div className="text-primary" key={index}>
              {item.evaluation.toString()}
            </div>
          )}
      </div>
    </div>
  );
}

export default EvaluationContent;
