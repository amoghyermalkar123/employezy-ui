/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import zustandStore from "../../store/ZustandStore";

function ApplicationTableComp({ tableData }: any) {
  const { setJobViewState } = zustandStore();

  const navigate = useNavigate();

  const handleSideBar = () => {
    setJobViewState(true);
  };

  return (
    <div className="overflow-auto">
      <table className="table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: any, index: number) =>
            <tr key={index}>
              <td>
                {item.users.email}
              </td>
              <td>
                {item.salary}
              </td>
              <td className="flex flex-col items-center md:flex-row">
                <button
                  className="btn btn-outline w-max btn-primary"
                  onClick={() => {
                    handleSideBar();
                    navigate("/admin/candidate-details", { state: item });
                  }}
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
