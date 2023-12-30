/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AdminController from "../../controllers/AdminController";
import { useNavigate } from "react-router-dom";

function TableComp() {
  const [jobs, setJobs] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleJobs = async () => {
    try {
      const res = await AdminController.AllApplications(1);
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
                {item.opening_name}
              </td>
              <td>
                {item.location}
              </td>
              <td>
                {item.salary}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-outline"
                  onClick={() =>
                    navigate("/admin/manage", {
                      state: JSON.stringify(item.opening_id)
                    })}
                >
                  View More
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableComp;
