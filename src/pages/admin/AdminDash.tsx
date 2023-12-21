import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { motion } from "framer-motion";

import CardsComp from "../../components/adminComp/CardsComp";
import TableComp from "../../components/adminComp/TableComp";
import InfoComp from "../../components/adminComp/InfoComp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDash() {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="h-screen w-screen">
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
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full max-w-xs"
              />
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
          <section id="stats" className="p-4 w-full">
            <h2 className="font-medium text-xl mb-5">Job Statistics</h2>
            <CardsComp />
          </section>
          <section className="p-4 w-full">
            <InfoComp />
          </section>
          {/* table section starts here */}
          <section className="flex flex-col p-4">
            <h2 className="font-medium text-xl mb-5">Applications</h2>
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
            <a className="btn btn-ghost text-xl">EmployEzy Admin</a>
            <button
              className="btn btn-primary btn-outline w-full mt-5"
              onClick={toggleVisibility}
            >
              <IoAdd className="text-2xl" />
              Create Opening
            </button>
            <button className="btn btn-primary btn-outline w-full mt-5">
              <MdManageAccounts className="text-2xl" />
              Manage Openings
            </button>
            <li className="mt-5">
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex shadow-xl m-4">
        {isVisible &&
          <motion.div
            className="fixed top-0 right-0 h-full w-1/3 bg-gray-800 text-white z-50 rounded-xl"
            transition={{ delay: 0.2 }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Your content for the left div */}
            <div className="h-full w-full p-8">
              <div className="flex flex-row justify-between">
                <button className="btn" onClick={toggleVisibility}>
                  close
                </button>
                <h2 className="text-2xl font-bold">New Opening</h2>
              </div>
              <div className="flex mt-10">
                <div className="label"> Name</div>
                <input
                  type="text"
                  placeholder="Title"
                  className="input w-full"
                />
              </div>
            </div>
          </motion.div>}
      </div>
    </div>
  );
}

export default AdminDash;
