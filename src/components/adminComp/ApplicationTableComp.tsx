/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";
import zustandStore from "../../store/ZustandStore";
import { CgClose } from "react-icons/cg";

function ApplicationTableComp({ tableData }: any) {
  const { setJobViewState } = zustandStore();

  const JobViewState = zustandStore(state => state.jobViewState);

  const handleSideBar = () => {
    setJobViewState(true);
  };

  const parseEval = async (evaluation: string) => {
    const data = await JSON.parse(evaluation);
    return data.code.evaluation;
  };

  return (
    <div className="overflow-auto">
      <table className="table">
        <thead>
          <tr>
            <th>User Email</th>
            {/*?  */}
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: any, index: number) =>
            <div className="" key={index}>
              <tr>
                <td>
                  {item.users.email}
                </td>
                <td>
                  {item.location}
                </td>
                <td>
                  {item.salary}
                </td>
                <td className="flex flex-col items-center md:flex-row">
                  <button
                    className="btn btn-outline w-max btn-primary"
                    onClick={() => {
                      handleSideBar();
                    }}
                  >
                    View More
                  </button>
                  <button className="btn btn-outline w-max btn-success m-2">
                    Accept
                  </button>
                  <button className="btn btn-outline w-max btn-error m-2">
                    Reject
                  </button>
                </td>
              </tr>

              {JobViewState &&
                <div className="fixed top-0 right-0 h-full w-full bg-base-200 text-black z-50 rounded-xl p-8 md:w-1/3">
                  <div className="flex flex-row justify-between">
                    <button
                      className="btn btn-outline"
                      onClick={() => setJobViewState(false)}
                    >
                      <CgClose classname="text-2xl" />
                    </button>
                    <h2 className="text-2xl font-bold">Evaluation</h2>
                  </div>
                  {/* content goes here */}
                  <div className="mt-8">
                    {(parseEval(item.evaluation) as unknown) as ReactNode}
                  </div>
                </div>}
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTableComp;
