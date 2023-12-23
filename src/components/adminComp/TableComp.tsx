/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AdminController from "../../controllers/AdminController";

function TableComp() {
  const [jobs, setJobs] = useState<any[]>([]);

  const handleJobs = async () => {
    try {
      const res = await AdminController.JobsPerCompany(1);
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
            <th>Application Name</th>
            <th>Location</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((item: any, index: number) =>
            <tr key={index}>
              <td>
                {item.opening_name}
              </td>
              <td>
                {item.location}
              </td>
              <td>
                {item.salary}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableComp;
