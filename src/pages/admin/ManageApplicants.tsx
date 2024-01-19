/* eslint-disable @typescript-eslint/no-explicit-any */

import ApplicationTableComp from "../../components/adminComp/ApplicationTableComp";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminController from "../../controllers/AdminController";

function ManageJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  const location = useLocation();
  const state = location.state;
  //* getting the opening id for table used to show submissions per job
  const data = JSON.parse(state);

  useEffect(
    () => {
      console.log(data);
    },
    [data]
  );

  useEffect(
    () => {
      const handleJobs = async () => {
        try {
          const res = await AdminController.UsersPerJobApplication(data);
          console.log(res);
          setJobs(res || []);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setJobs([]);
        }
      };
      handleJobs();
    },
    [data]
  );

  return (
    <div className="h-screen w-screen">
      <div className="p-8">
        <h2 className="text-4xl font-medium mb-5">Manage Applications</h2>
        <ApplicationTableComp tableData={jobs} />
      </div>
    </div>
  );
}

export default ManageJobsPage;
