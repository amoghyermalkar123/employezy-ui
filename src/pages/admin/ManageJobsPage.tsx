import { useEffect } from "react";
import AdminController from "../../controllers/AdminController";

function ManageJobsPage() {
  useEffect(() => {
    AdminController.JobsPerCompany(1);
  }, []);

  return (
    <div className="h-screen w-screen">
      <h1>Manage Jobs</h1>
    </div>
  );
}

export default ManageJobsPage;
