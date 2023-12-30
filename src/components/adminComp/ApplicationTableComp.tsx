/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import zustandStore from "../../store/ZustandStore";
import { CgClose } from "react-icons/cg";

function ApplicationTableComp({ tableData }: any) {
  const { setJobViewState } = zustandStore();
  const [jobIndex, setJobIndex] = useState(0);

  const JobViewState = zustandStore(state => state.jobViewState);

  const handleSideBar = () => {
    setJobViewState(true);
  };

  return (
    <div className="overflow-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: any, index: number) =>
            <tr key={index}>
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
                    setJobIndex(index);
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
          )}
        </tbody>
      </table>

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
          <div className="">
            {jobIndex}
          </div>
        </div>}
    </div>
  );
}

export default ApplicationTableComp;
