/* eslint-disable @typescript-eslint/no-explicit-any */

import zustandStore from "../../store/ZustandStore";
import ApplicationTableComp from "../../components/adminComp/ApplicationTableComp";
import { CgClose } from "react-icons/cg";

function ManageJobsPage() {
  const { setJobViewState } = zustandStore();
  const JobViewState = zustandStore(state => state.jobViewState);

  return (
    <div className="h-screen w-screen">
      <div className="p-8">
        <h2 className="text-4xl font-medium mb-5">Manage Applications</h2>
        <ApplicationTableComp />
      </div>
      {JobViewState &&
        <div className="fixed top-0 right-0 h-full w-full bg-base-200 text-black z-50 rounded-xl p-8 md:w-1/3">
          <div className="flex flex-row justify-between">
            <button
              className="btn btn-outline"
              onClick={() => setJobViewState(false)}
            >
              <CgClose classname="text-2xl" />
            </button>
            <h2 className="text-2xl font-bold">New Opening</h2>
          </div>
        </div>}
    </div>
  );
}

export default ManageJobsPage;
