/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AdminController from "../../controllers/AdminController";
import zustandStore from "../../store/ZustandStore";

function ApplicationTableComp() {
  const [jobs, setJobs] = useState<any[]>([]);
  const { setJobViewState } = zustandStore();

  const handleSideBar = () => {
    setJobViewState(true);
  };

  const handleJobs = async () => {
    try {
      const res = await AdminController.AllApplications();
      console.log(res);
      setJobs(res || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };
  useEffect(() => {
    handleJobs();
  }, []);

  return (
    <div className="overflow-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Opening Name</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((item: any, index: number) =>
            <tr key={index}>
              <td>
                {item.submission_id}
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
                  onClick={handleSideBar}
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
    </div>
  );
}

export default ApplicationTableComp;
