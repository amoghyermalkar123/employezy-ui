import { useEffect, useState } from "react";
import CalenderComp from "./CalenderComp";
import AdminController from "../../controllers/AdminController";

function InfoComp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nudges, setNudges] = useState<any[]>([]);

  const getNudges = async () => {
    const response = await AdminController.fetchNudges();
    if (response) {
      setNudges(response);
    }
  };

  useEffect(() => {
    getNudges();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2">
      <div className="card w-full bg-base-100 border-2">
        <div className="card-body">
          <CalenderComp />
        </div>
      </div>
      <div className="card h-full w-full bg-base-100 border-2 ">
        <div className="card-body">
          <h2 className="card-title">Nudges</h2>
          <div className="divider" />
          <div className="h-80 overflow-auto">
            {nudges &&
              nudges.map((item, index) =>
                <div className="m-2" key={index}>
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600">
                      {item.Users.email}
                    </p>
                    <p className="text-sm text-gray-600 font-bold">
                      {item.JobOpenings.opening_name}
                    </p>
                  </div>

                  <p>
                    {item.nudge_message}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoComp;
