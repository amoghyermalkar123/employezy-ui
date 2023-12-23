import { HiMenuAlt2 } from "react-icons/hi";
import zustandStore from "../store/ZustandStore";
import DiscoverPage from "../components/Discover";
import SavedJobs from "../components/SavedJobs";
<<<<<<< HEAD
import userAuth from "../controllers/UserController.ts";
import { useNavigate } from "react-router-dom";
=======
import AppliedJobs from "../components/Applied";
>>>>>>> origin/master

function HomePage() {
  const pageIndex = zustandStore(state => state.pageIndex);
  const { setPageIndex } = zustandStore();
  const { setSearchTerm } = zustandStore();
  const searchTerm = zustandStore(state => state.searchTerm);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();

  const renderPage = () => {
    switch (pageIndex) {
      case 0:
        return <DiscoverPage searchTerm={searchTerm} />;
      case 1:
        return <SavedJobs />;
      case 2:
        return <AppliedJobs/>;
      default:
        return <div>Invalid Page Index!</div>;
    }
  };

  return (
    <div className="h-screen w-screen bg-base-200 overflow-y-auto">
      <div className="">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="w-full navbar bg-base-300 flex justify-between">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <HiMenuAlt2 className="text-2xl" />
                </label>
              </div>
              <div className="w-40 px-2 mx-2 font-bold text-xl">EmployEzy</div>
              {/*  navbar center */}
              <div className="flex-1 navbar-center hidden md:block lg:flex">
                <div className="form-control w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={onChange}
                    className="bg-inherit input input-bordered md:w-auto"
                  />
                </div>
              </div>
              {/* navbar center end */}
              <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal">
                  {/* Navbar menu content here */}
                  <li onClick={() => setPageIndex(0)}>
                    <a>Discover</a>
                  </li>
                  <li onClick={() => setPageIndex(1)}>
                    <a>Saved Jobs</a>
                  </li>
                  <li onClick={() => setPageIndex(2)}>
                    <a>Applied Jobs</a>
                  </li>
                </ul>
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
                  <li
                    onClick={async () => {
                      const res = await userAuth.handleLogout();
                      if (res === "ok") {
                        navigate("/login");
                      }
                    }}
                  >
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
            {/*Navbar end  */}
            {renderPage()}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <ul className="menu p-4 w-80 min-h-full bg-base-200">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
