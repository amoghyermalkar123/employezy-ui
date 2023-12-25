import { CgClose } from "react-icons/cg";
import zustandStore from "../../store/ZustandStore";
import { AdminController } from "../../controllers/AdminController.ts";

export function ApplicationCardComp() {

  const { setJobViewState } = zustandStore();
  
  const handleJobInfo =  async()=>{
    const res = AdminController.AllAplications();
  }

  

  return (
<div className="h-full w-full">
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
          <div className="">
            
          </div>
        </div>
    </div>
  );
  
}
