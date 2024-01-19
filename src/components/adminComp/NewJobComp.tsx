import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import zustandStore from "../../store/ZustandStore.ts";
import { useState } from "react";
import AdminController from "../../controllers/AdminController.ts";

export default function NewJobComp() {
  const data = JSON.parse(localStorage.getItem("org_details")!);
  const { setNewJobSideBarState } = zustandStore();

  const [jobName, setJobName] = useState("");
  const [assignment, setAssignment] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const Job_tags = ["Full Time", "Hybrid"];

  const handleNewJobopening = async () => {
    AdminController.createJobOpening(
      data.org_id,
      jobName,
      assignment,
      Job_tags,
      location,
      salary
    );
    setNewJobSideBarState(false);
  };

  return (
    <div className="h-full w-full">
      <motion.div
        className="fixed top-0 right-0 h-full w-full bg-base-200 text-black z-50 rounded-xl md:w-1/3"
        transition={{ delay: 0.2 }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* Your content for the left div */}
        <div className=" flex flex-col h-full w-full p-8 overflow-y-auto">
          <div className="flex flex-row justify-between">
            <button
              className="btn btn-outline"
              onClick={() => setNewJobSideBarState(false)}
            >
              <CgClose classname="text-2xl" />
            </button>
            <h2 className="text-2xl font-bold">New Opening</h2>
          </div>
          <div className="mt-10">
            <div className="label"> Name</div>
            <input
              type="text"
              placeholder="Title"
              className="w-full input rounded-xl"
              onChange={e => setJobName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <div className="label"> Assignment </div>
            <input
              type="text"
              placeholder="Title"
              className="w-full input rounded-xl"
              onChange={e => setAssignment(e.target.value)}
            />
            <div className="label"> Salary</div>
            <input
              type="number"
              placeholder="30000"
              className="w-full input rounded-xl"
              onChange={e => setSalary(e.target.value)}
            />
            <div className="label"> Location</div>
            <input
              type="text"
              placeholder="Pune or Banglore etc..."
              className="w-full input rounded-xl"
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div>
            <button
              className="w-full btn btn-primary btn-outline"
              onClick={() => handleNewJobopening()}
            >
              Create Opening
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
