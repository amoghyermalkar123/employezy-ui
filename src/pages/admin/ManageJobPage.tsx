import { useEffect } from "react";
import AdminController from "../../controllers/AdminController";
import Job from "../../types/jobTypes";

const handleJobs = async () => {
  const data = localStorage.getItem("org_details");
  if (data) {
    const org = JSON.parse(data);
    const JobData: Job[] | null = await AdminController.AllJobs(org.org_id);
    if (JobData) {
      // use JobData
    }
  }
};

function ManageJobPage() {
  useEffect(() => {
    handleJobs();
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="overflow-x-auto mx-4 md:mx-12 lg:mx-24 xl:48 p-4">
        <h2 className="text-4xl font-semibold tracking-wider">Manage Jobs</h2>
        <table className="table mt-10">
          {/* head */}
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ManageJobPage;
