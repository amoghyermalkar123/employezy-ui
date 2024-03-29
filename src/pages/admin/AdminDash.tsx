/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";

import { IoAdd } from "react-icons/io5";
import TableComp from "../../components/adminComp/TableComp";
import InfoComp from "../../components/adminComp/InfoComp";
import zustandStore from "../../store/ZustandStore";
import { useNavigate } from "react-router-dom";
import NewJobComp from "../../components/adminComp/NewJobComp";

function AdminDash() {
  const NewJobSideBarState = zustandStore(state => state.NewJobSideBarState);
  const { setNewJobSideBarState } = zustandStore();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="navbar flex flex-row justify-between bg-base-100">
            <div className="">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-ghost drawer-button lg:hidden"
              >
                <HiOutlineMenuAlt1 className="text-2xl" />
              </label>
              <a className="btn btn-ghost text-xl">EmployEzy Admin</a>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={() => navigate("/login")}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
          {/* navbar ends here */}
          {/* stats section starts here */}
          {/* <section id="stats" className="p-4 w-full">
            <CardsComp />
          </section> */}
          <section className="p-4 w-full">
            <InfoComp />
          </section>
          {/* table section starts here */}
          <section className="flex flex-col p-4">
            <h2 className="font-medium text-xl mb-5">Openings</h2>
            <div className="w-full h-80 overflow-auto border-2 rounded-xl">
              <TableComp />
            </div>
          </section>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            <button
              className="btn btn-primary btn-outline w-full mt-5"
              onClick={() => setNewJobSideBarState(true)}
            >
              <IoAdd className="text-2xl" />
              Create Opening
            </button>
            <button
              className="btn btn-primary btn-outline w-full mt-5"
              onClick={() => navigate("/admin/managejobs")}
            >
              <IoIosSettings className="text-2xl" />
              Manage Jobs
            </button>
          </ul>
        </div>
      </div>

      <div className="flex shadow-xl">
        {NewJobSideBarState && <NewJobComp />}
      </div>
    </div>
  );
}

export default AdminDash;
