// // import { useEffect, useState } from "react";
// // import { Code } from "../../types/codeTypes";

// // function EvaluationContent({ evaluation }: { evaluation: string }) {
// //   const [eval1, setEval1] = useState<Code[]>([]);

// //   useEffect(
// //     () => {
// //       const handleEval = () => {
// //         try {
// //           const data: Code[] = JSON.parse(evaluation);
// //           setEval1(data);
// //         } catch (error) {
// //           console.error("Error parsing evaluation data:", error);
// //         }
// //       };

// //       handleEval();
// //     },
// //     [evaluation]
// //   );

// //   return (
// //     <div className="h-full w-full">
// //       <div>
// //         {Array.isArray(eval1) &&
// //           eval1.map((item, index) =>
// //             <div className="text-primary" key={index}>
// //               {item.evaluation.toString()}
// //             </div>
// //           )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default EvaluationContent;
// import { useEffect, useState } from "react";
// import { Code } from "../../types/codeTypes";

// function EvaluationContent({ evaluation }: { evaluation: string }) {
//   const [eval1, setEval1] = useState<Code>();

//   useEffect(
//     () => {
//       const handleEval = () => {
//         try {
//           const data: Code = JSON.parse(evaluation);
//           setEval1(data);

//         } catch (error) {
//           console.error("Error parsing evaluation data:", error);
//           // Log the JSON string to help identify issues
//           console.log("Invalid JSON string:", evaluation);
//         }
//       };

//       handleEval();
//     },
//     [evaluation]
//   );

//   useEffect(() => {
//     console.log("eval1", eval1);
//   }, [eval1]);
//   return (
//     <div className="h-full w-full">
//       <div>
//         {eval1?.evaluation}
//       </div>
//     </div>
//   );
// }

// export default EvaluationContent;

import { useEffect, useState } from "react";

function EvaluationContent({ evaluation }: { evaluation: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [eval1, setEval1] = useState<any>();

  useEffect(() => {
    const handleEval = () => {
      try {
        const data = JSON.parse(evaluation);
        setEval1(data);
      } catch (error) {
        console.error("Error parsing evaluation data:", error);
        console.log("Invalid JSON string:", evaluation);
      }
    };

    handleEval();
  }, [evaluation]);

  useEffect(() => {
    const logEval = () => {
      console.log("eval1", eval1);
    };

    // Use a callback function to log eval1 after the state is updated
    logEval();
  }, [eval1]);

  return (
    <div className="h-full w-full">
      <div>{eval1?.code?.evaluation}</div>
    </div>
  );
}

export default EvaluationContent;
