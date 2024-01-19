import { useEffect, useState } from "react";
import AdminController from "../../controllers/AdminController";
import Job from "../../types/jobTypes";

const handleJobs = async () => {
  const data = localStorage.getItem("org_details");
  if (data) {
    const org = JSON.parse(data);
    const JobData: Job[] | null = await AdminController.AllJobs(org.org_id);
    if (JobData) {
      // use JobData
      return JobData;
    }
  }
};

function ManageJobPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleDelete = async (opening_id: number) => {
    const res = await AdminController.DeleteJob(opening_id);
    if (res === null) {
      console.log(res);
    }
  };

  useEffect(() => {
    const data = handleJobs();
    data.then(jobData => {
      if (jobData) {
        setJobs(jobData);
      }
    });
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="overflow-x-auto mx-4 md:mx-12 lg:mx-24 xl:48 p-4">
        <h2 className="text-4xl font-semibold tracking-wider">Manage Jobs</h2>
        <table className="table mt-10 ">
          {/* head */}
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {jobs.map((item, index) =>
              <tr key={index}>
                <th>
                  {index + 1}
                </th>
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
                    className="btn btn-error btn-outline"
                    onClick={() => handleDelete(item.opening_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageJobPage;
